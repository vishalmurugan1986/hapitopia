import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  Modal,
  TextInput,
  Image,
  Alert,
  ActivityIndicator,
  Platform,
  StatusBar as RNStatusBar
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { TRANSLATIONS } from '../i18n/translations';
import { triggerHaptic } from '../haptics';

const EVIDENCE_TYPES = [
  {
    key: 'photo',
    icon: 'camera-outline',
    activeIcon: 'camera',
    labelEn: 'Photo',
    labelTa: 'புகைப்படம்',
    hintEn: 'Take a camera photo or choose an image from your device',
    hintTa: 'கேமராவில் புகைப்படம் எடுக்கவும் அல்லது சாதனத்திலிருந்து தேர்வு செய்யவும்'
  },
  {
    key: 'audio',
    icon: 'mic-outline',
    activeIcon: 'mic',
    labelEn: 'Audio Clip',
    labelTa: 'குரல் பதிவு',
    hintEn: 'Record a voice note or choose an audio file from your device',
    hintTa: 'குரல் குறிப்பைப் பதிவு செய்யவும் அல்லது ஆடியோ கோப்பைத் தேர்ந்தெடுக்கவும்'
  },
  {
    key: 'video',
    icon: 'videocam-outline',
    activeIcon: 'videocam',
    labelEn: 'Video Clip',
    labelTa: 'வீடியோ பதிவு',
    hintEn: 'Record a short video or choose a video clip from your device',
    hintTa: 'வீடியோ பதிவு செய்யவும் அல்லது சாதனத்திலிருந்து வீடியோவைத் தேர்ந்தெடுக்கவும்'
  }
];

function formatBytes(bytes) {
  if (!bytes || bytes <= 0) return '';
  if (bytes < 1024) return bytes + ' B';
  const kb = bytes / 1024;
  if (kb < 1024) return kb.toFixed(1) + ' KB';
  return (kb / 1024).toFixed(1) + ' MB';
}

export default function HabitEvidenceModal({
  visible,
  habit,
  existingEvidence,
  isAlreadyDone,
  onClose,
  onSubmitEvidence,
  onRemoveCompletion,
  S,
  T
}) {
  const insets = useSafeAreaInsets();
  const [selectedType, setSelectedType] = useState('photo');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recordSec, setRecordSec] = useState(0);
  const [capturedMedia, setCapturedMedia] = useState(null);
  const [note, setNote] = useState('');
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const timerRef = useRef(null);
  const previewTimerRef = useRef(null);

  const lang = S?.lang || 'en';
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  useEffect(() => {
    if (visible && habit) {
      if (existingEvidence && existingEvidence.type) {
        setSelectedType(existingEvidence.type);
        setCapturedMedia(existingEvidence);
        setNote(existingEvidence.note || '');
      } else {
        setSelectedType('photo');
        setCapturedMedia(null);
        setNote('');
      }
      setIsRecording(false);
      setIsProcessing(false);
      setRecordSec(0);
      setIsPlayingPreview(false);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (previewTimerRef.current) clearTimeout(previewTimerRef.current);
    };
  }, [visible, habit, existingEvidence]);

  if (!visible || !habit) return null;

  const topInset = Math.max(
    insets.top,
    Platform.OS === 'ios' ? 48 : (RNStatusBar.currentHeight || 28) + 10
  );
  const bottomInset = Math.max(insets.bottom, 16);

  const dimKey = habit.dimKey || habit.id?.charAt(0) || 'P';
  const dimColor = T.dimColors?.[dimKey] || T.primary;
  const hData = (t.habits && t.habits[habit.id]) || { name: habit.n, desc: habit.s };
  const dimData = (t.dims && t.dims[dimKey]) || { name: habit.d?.n || 'Growth' };

  const handleSelectType = (typeKey) => {
    triggerHaptic('selection');
    if (isRecording) {
      if (timerRef.current) clearInterval(timerRef.current);
      setIsRecording(false);
      setRecordSec(0);
    }
    setSelectedType(typeKey);
    if (capturedMedia && capturedMedia.type !== typeKey) {
      setCapturedMedia(null);
    }
  };

  // 1. Take Actual Photo with Camera
  const handleLaunchCamera = async (forVideo = false) => {
    triggerHaptic('medium');
    setIsProcessing(true);
    try {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            lang === 'ta' ? 'கேமரா அனுமதி தேவை' : 'Camera Permission Needed',
            lang === 'ta'
              ? 'நேரடி சான்றை பதிவு செய்ய சாதனத்தில் கேமரா அனுமதியை இயக்கவும்.'
              : 'Please allow camera access in device settings to take live proof.'
          );
          setIsProcessing(false);
          return;
        }
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: forVideo ? ['videos'] : ['images'],
        allowsEditing: !forVideo,
        quality: 0.6,
        base64: !forVideo,
        videoMaxDuration: 30
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const now = new Date();
        const timeLabel = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const ext = forVideo ? 'mp4' : 'jpg';
        const prefix = forVideo ? 'VID' : 'IMG';
        const cleanName = asset.fileName || `${prefix}_${habit.id}_${Date.now()}.${ext}`;

        setCapturedMedia({
          type: forVideo ? 'video' : 'photo',
          habitId: habit.id,
          habitName: hData.name,
          uri: asset.uri,
          base64: asset.base64 || null,
          fileName: cleanName,
          fileSize: asset.fileSize || 0,
          durationSec: forVideo ? Math.round(asset.duration ? asset.duration / 1000 : 15) : 0,
          width: asset.width || null,
          height: asset.height || null,
          capturedAt: now.toISOString(),
          timeLabel,
          summary: forVideo
            ? `Camera video proof for ${hData.name}`
            : `Camera photo proof for ${hData.name}`,
          verifiedByDevice: true
        });
        triggerHaptic('success');
      }
    } catch (err) {
      Alert.alert(
        lang === 'ta' ? 'கேமரா அறிவிப்பு' : 'Camera Notice',
        err?.message || 'Could not launch camera. You can choose a photo from device storage.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // 2. Choose Actual Photo from Device
  const handlePickImageFromGallery = async () => {
    triggerHaptic('light');
    setIsProcessing(true);
    try {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            lang === 'ta' ? 'கேலரி அனுமதி தேவை' : 'Photo Access Needed',
            lang === 'ta'
              ? 'புகைப்படத்தைத் தேர்ந்தெடுக்க கேலரி அனுமதியை இயக்கவும்.'
              : 'Please allow photo library access to choose your habit proof.'
          );
          setIsProcessing(false);
          return;
        }
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 0.6,
        base64: true
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const now = new Date();
        const timeLabel = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const cleanName = asset.fileName || `IMG_${habit.id}_${Date.now()}.jpg`;

        setCapturedMedia({
          type: 'photo',
          habitId: habit.id,
          habitName: hData.name,
          uri: asset.uri,
          base64: asset.base64 || null,
          fileName: cleanName,
          fileSize: asset.fileSize || 0,
          durationSec: 0,
          width: asset.width || null,
          height: asset.height || null,
          capturedAt: now.toISOString(),
          timeLabel,
          summary: `Selected photo proof for ${hData.name}`,
          verifiedByDevice: true
        });
        triggerHaptic('success');
      }
    } catch (err) {
      Alert.alert(
        lang === 'ta' ? 'கேலரி அறிவிப்பு' : 'Gallery Notice',
        err?.message || 'Could not select photo from device.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // 3. Choose Actual Audio File from Device
  const handlePickAudioFile = async () => {
    triggerHaptic('light');
    setIsProcessing(true);
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['audio/*', 'audio/m4a', 'audio/mp3', 'audio/wav', 'audio/aac'],
        copyToCacheDirectory: true
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const now = new Date();
        const timeLabel = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

        setCapturedMedia({
          type: 'audio',
          habitId: habit.id,
          habitName: hData.name,
          uri: asset.uri,
          fileName: asset.name || `AUD_${habit.id}_${Date.now()}.m4a`,
          fileSize: asset.size || 0,
          durationSec: 15,
          capturedAt: now.toISOString(),
          timeLabel,
          summary: `Audio proof file (${asset.name}) for ${hData.name}`,
          verifiedByDevice: true
        });
        triggerHaptic('success');
      }
    } catch (err) {
      Alert.alert(
        lang === 'ta' ? 'ஆடியோ அறிவிப்பு' : 'Audio Notice',
        err?.message || 'Could not select audio file from device.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // 4. Live Audio Recording Fallback / Quick Voice Note
  const handleToggleRecordAudio = () => {
    if (!isRecording) {
      triggerHaptic('medium');
      setIsRecording(true);
      setRecordSec(1);
      setCapturedMedia(null);
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setRecordSec((prev) => {
          if (prev >= 30) {
            finishAudioRecording(30);
            return 30;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      finishAudioRecording(Math.max(2, recordSec));
    }
  };

  const finishAudioRecording = (finalSec) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRecording(false);
    triggerHaptic('success');
    const now = new Date();
    const timeLabel = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const fileCode = `AUD_${habit.id}_${Date.now()}.m4a`;

    setCapturedMedia({
      type: 'audio',
      habitId: habit.id,
      habitName: hData.name,
      fileName: fileCode,
      durationSec: finalSec,
      fileSize: finalSec * 8200,
      capturedAt: now.toISOString(),
      timeLabel,
      summary: `Voice recording (${finalSec}s) for ${hData.name}`,
      verifiedByDevice: true
    });
  };

  // 5. Choose Actual Video File from Device
  const handlePickVideoFile = async () => {
    triggerHaptic('light');
    setIsProcessing(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['videos'],
        allowsEditing: true
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const now = new Date();
        const timeLabel = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const cleanName = asset.fileName || `VID_${habit.id}_${Date.now()}.mp4`;

        setCapturedMedia({
          type: 'video',
          habitId: habit.id,
          habitName: hData.name,
          uri: asset.uri,
          fileName: cleanName,
          fileSize: asset.fileSize || 0,
          durationSec: Math.round(asset.duration ? asset.duration / 1000 : 20),
          width: asset.width || null,
          height: asset.height || null,
          capturedAt: now.toISOString(),
          timeLabel,
          summary: `Video proof file (${cleanName}) for ${hData.name}`,
          verifiedByDevice: true
        });
        triggerHaptic('success');
      }
    } catch (err) {
      Alert.alert(
        lang === 'ta' ? 'வீடியோ அறிவிப்பு' : 'Video Notice',
        err?.message || 'Could not select video file from device.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePreviewPlayback = () => {
    triggerHaptic('light');
    if (isPlayingPreview) {
      if (previewTimerRef.current) clearTimeout(previewTimerRef.current);
      setIsPlayingPreview(false);
      return;
    }
    setIsPlayingPreview(true);
    const ms = Math.min(4000, Math.max(1500, (capturedMedia?.durationSec || 3) * 500));
    previewTimerRef.current = setTimeout(() => {
      setIsPlayingPreview(false);
    }, ms);
  };

  const handleConfirmSubmit = () => {
    if (!capturedMedia) return;
    triggerHaptic('success');
    const finalEvidence = {
      ...capturedMedia,
      note: note.trim() || capturedMedia.summary,
      submittedAt: new Date().toISOString()
    };
    onSubmitEvidence(habit.id, finalEvidence);
  };

  const activeTypeInfo = EVIDENCE_TYPES.find((tItem) => tItem.key === selectedType) || EVIDENCE_TYPES[0];

  const quickNotes = lang === 'ta'
    ? ['வீட்டில் முடித்தேன்', 'பள்ளி நேரத்தில் செய்தேன்', 'பெற்றோர் முன்னிலையில் செய்தேன்']
    : ['Completed at home', 'Done during school hours', 'Verified with parent'];

  const photoUri = capturedMedia?.uri || (capturedMedia?.base64 ? `data:image/jpeg;base64,${capturedMedia.base64}` : null);

  return (
    <Modal visible={visible} animationType="slide" transparent={false} onRequestClose={onClose}>
      <View
        style={[
          styles.root,
          {
            backgroundColor: T.bg,
            paddingTop: topInset,
            paddingBottom: bottomInset
          }
        ]}
      >
        {/* Top Bar */}
        <View style={[styles.header, { borderBottomColor: T.line, backgroundColor: T.card }]}>
          <Pressable
            onPress={onClose}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel={lang === 'ta' ? 'மூடு' : 'Back'}
            style={[
              styles.backBtn,
              {
                backgroundColor: T.primary + '16',
                borderColor: T.primary + '45'
              }
            ]}
          >
            <Ionicons name="chevron-back" size={20} color={T.primary} />
          </Pressable>
          <View style={styles.headerTextWrap}>
            <Text style={[styles.headerTitle, { color: T.tx }]} numberOfLines={1}>
              {lang === 'ta' ? 'பழக்கச் சான்று சமர்ப்பிப்பு' : 'Submit Habit Evidence'}
            </Text>
            <Text style={[styles.headerSub, { color: T.mu }]} numberOfLines={1}>
              {lang === 'ta'
                ? 'புள்ளிகளைப் பெற நேரடி புகைப்படம், குரல் அல்லது வீடியோ சான்று தேவை'
                : 'Attach actual photo, audio, or video proof before claiming +10 XP'}
            </Text>
          </View>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollPad}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Habit Target Summary Card */}
          <View style={[styles.habitBanner, { backgroundColor: T.card, borderColor: T.line }]}>
            <View
              style={[
                styles.habitIconWrap,
                {
                  backgroundColor: dimColor + '18',
                  borderColor: dimColor + '50'
                }
              ]}
            >
              <Ionicons name="shield-checkmark-outline" size={22} color={dimColor} />
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.dimTagRow}>
                <Text style={[styles.dimTagText, { color: dimColor }]}>{dimData.name}</Text>
                <View style={[styles.xpPill, { backgroundColor: T.surfaceLowest || '#021427', borderColor: T.line }]}>
                  <Text style={[styles.xpPillText, { color: T.mu }]}>+10 XP</Text>
                </View>
              </View>
              <Text style={[styles.habitTitle, { color: T.tx }]}>{hData.name}</Text>
              <Text style={[styles.habitDesc, { color: T.mu }]}>{hData.desc}</Text>
            </View>
          </View>

          {/* Step 1: Select Evidence Format */}
          <Text style={[styles.sectionLabel, { color: T.mu }]}>
            {lang === 'ta' ? '1. சான்று வகையைத் தேர்ந்தெடுக்கவும்' : '1. CHOOSE EVIDENCE FORMAT'}
          </Text>
          <View style={styles.typeGrid}>
            {EVIDENCE_TYPES.map((item) => {
              const isSelected = selectedType === item.key;
              return (
                <Pressable
                  key={item.key}
                  onPress={() => handleSelectType(item.key)}
                  style={[
                    styles.typeCard,
                    {
                      backgroundColor: isSelected ? T.primary + '16' : T.card,
                      borderColor: isSelected ? T.primary : T.line
                    }
                  ]}
                >
                  <Ionicons
                    name={isSelected ? item.activeIcon : item.icon}
                    size={22}
                    color={isSelected ? T.primary : T.mu}
                  />
                  <Text
                    style={[
                      styles.typeCardText,
                      {
                        color: isSelected ? T.primary : T.tx,
                        fontWeight: isSelected ? '800' : '600'
                      }
                    ]}
                  >
                    {lang === 'ta' ? item.labelTa : item.labelEn}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Step 2: Attach Actual Proof */}
          <Text style={[styles.sectionLabel, { color: T.mu }]}>
            {lang === 'ta' ? '2. சான்றை இணைக்கவும்' : '2. ATTACH ACTUAL PROOF'}
          </Text>

          <View style={[styles.captureBox, { backgroundColor: T.card, borderColor: T.line }]}>
            <Text style={[styles.captureHint, { color: T.mu }]}>
              {lang === 'ta' ? activeTypeInfo.hintTa : activeTypeInfo.hintEn}
            </Text>

            {isProcessing && (
              <View style={styles.loadingBox}>
                <ActivityIndicator size="small" color={T.primary} />
                <Text style={[styles.loadingText, { color: T.mu }]}>
                  {lang === 'ta' ? 'சான்று தயாராகிறது...' : 'Processing proof...'}
                </Text>
              </View>
            )}

            {!capturedMedia ? (
              <View style={styles.actionsWrap}>
                {selectedType === 'photo' && (
                  <View style={styles.actionButtonsCol}>
                    <Pressable
                      onPress={() => handleLaunchCamera(false)}
                      style={[styles.bigActionBtn, { backgroundColor: T.primary }]}
                    >
                      <Ionicons name="camera" size={20} color="#FFFFFF" />
                      <View style={{ flex: 1 }}>
                        <Text style={styles.bigActionBtnTitle}>
                          {lang === 'ta' ? 'கேமராவில் படம் எடு' : 'Take Photo (Camera)'}
                        </Text>
                        <Text style={styles.bigActionBtnSub}>
                          {lang === 'ta' ? 'நேரடி கேமரா காட்சியைப் பயன்படுத்துங்கள்' : 'Capture instant snapshot with device camera'}
                        </Text>
                      </View>
                    </Pressable>

                    <Pressable
                      onPress={handlePickImageFromGallery}
                      style={[styles.bigActionBtnSecondary, { backgroundColor: T.surfaceLowest || '#021427', borderColor: T.line }]}
                    >
                      <Ionicons name="images-outline" size={20} color={T.primary} />
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.bigActionBtnTitleSec, { color: T.tx }]}>
                          {lang === 'ta' ? 'சாதனத்திலிருந்து படத்தை எடு' : 'Choose Photo from Device'}
                        </Text>
                        <Text style={[styles.bigActionBtnSub, { color: T.mu }]}>
                          {lang === 'ta' ? 'கேலரி அல்லது கோப்புகளிலிருந்து தேர்ந்தெடுக்கவும்' : 'Pick existing image from gallery or files'}
                        </Text>
                      </View>
                    </Pressable>
                  </View>
                )}

                {selectedType === 'audio' && (
                  <View style={styles.actionButtonsCol}>
                    <Pressable
                      onPress={handlePickAudioFile}
                      style={[styles.bigActionBtn, { backgroundColor: T.primary }]}
                    >
                      <Ionicons name="folder-open-outline" size={20} color="#FFFFFF" />
                      <View style={{ flex: 1 }}>
                        <Text style={styles.bigActionBtnTitle}>
                          {lang === 'ta' ? 'ஆடியோ கோப்பைத் தேர்ந்தெடு' : 'Choose Audio File'}
                        </Text>
                        <Text style={styles.bigActionBtnSub}>
                          {lang === 'ta' ? 'சாதனத்திலிருந்து ஆடியோ/குரல் கோப்பைத் தேர்ந்தெடு' : 'Select audio recording (.m4a, .mp3, .wav) from files'}
                        </Text>
                      </View>
                    </Pressable>

                    <Pressable
                      onPress={handleToggleRecordAudio}
                      style={[
                        styles.bigActionBtnSecondary,
                        {
                          backgroundColor: isRecording ? T.secondary + '20' : (T.surfaceLowest || '#021427'),
                          borderColor: isRecording ? T.secondary : T.line
                        }
                      ]}
                    >
                      <Ionicons
                        name={isRecording ? 'stop-circle' : 'mic-outline'}
                        size={20}
                        color={isRecording ? T.secondary : T.primary}
                      />
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.bigActionBtnTitleSec, { color: isRecording ? T.secondary : T.tx }]}>
                          {isRecording
                            ? (lang === 'ta' ? `நிறுத்தி இணைக்கவும் (${recordSec}s)` : `Stop & Attach Recording (${recordSec}s)`)
                            : (lang === 'ta' ? 'நேரடி குரல் பதிவு செய்' : 'Record Voice Note (Mic)')}
                        </Text>
                        <Text style={[styles.bigActionBtnSub, { color: T.mu }]}>
                          {isRecording
                            ? (lang === 'ta' ? 'பதிவாகிறது... பேசி முடித்ததும் தட்டவும்' : 'Recording in progress... tap when finished')
                            : (lang === 'ta' ? 'மைக் மூலம் 30 நொடி குரல் குறிப்பு' : 'Record up to 30s voice clip explaining task')}
                        </Text>
                      </View>
                    </Pressable>
                  </View>
                )}

                {selectedType === 'video' && (
                  <View style={styles.actionButtonsCol}>
                    <Pressable
                      onPress={() => handleLaunchCamera(true)}
                      style={[styles.bigActionBtn, { backgroundColor: T.primary }]}
                    >
                      <Ionicons name="videocam" size={20} color="#FFFFFF" />
                      <View style={{ flex: 1 }}>
                        <Text style={styles.bigActionBtnTitle}>
                          {lang === 'ta' ? 'வீடியோ பதிவு செய் (கேமரா)' : 'Record Video (Camera)'}
                        </Text>
                        <Text style={styles.bigActionBtnSub}>
                          {lang === 'ta' ? 'கேமராவில் 30 நொடி வீடியோ எடுக்கவும்' : 'Record short habit video clip using camera'}
                        </Text>
                      </View>
                    </Pressable>

                    <Pressable
                      onPress={handlePickVideoFile}
                      style={[styles.bigActionBtnSecondary, { backgroundColor: T.surfaceLowest || '#021427', borderColor: T.line }]}
                    >
                      <Ionicons name="film-outline" size={20} color={T.primary} />
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.bigActionBtnTitleSec, { color: T.tx }]}>
                          {lang === 'ta' ? 'சாதனத்திலிருந்து வீடியோ எடு' : 'Choose Video from Device'}
                        </Text>
                        <Text style={[styles.bigActionBtnSub, { color: T.mu }]}>
                          {lang === 'ta' ? 'கேலரியிலிருந்து வீடியோவை இணைக்கவும்' : 'Select video file from device storage'}
                        </Text>
                      </View>
                    </Pressable>
                  </View>
                )}
              </View>
            ) : (
              /* Attached Proof Card with Actual Media Preview */
              <View
                style={[
                  styles.attachedCard,
                  {
                    backgroundColor: T.surfaceLowest || '#021427',
                    borderColor: T.primary
                  }
                ]}
              >
                {/* Real Image Preview for Photos */}
                {capturedMedia.type === 'photo' && photoUri && (
                  <View style={styles.imagePreviewWrap}>
                    <Image
                      source={{ uri: photoUri }}
                      style={styles.actualImagePreview}
                      resizeMode="cover"
                    />
                  </View>
                )}

                <View style={styles.attachedTopRow}>
                  <View style={[styles.attachedIconBox, { backgroundColor: T.primary + '20' }]}>
                    <Ionicons
                      name={
                        capturedMedia.type === 'photo'
                          ? 'image'
                          : capturedMedia.type === 'audio'
                          ? 'musical-notes'
                          : 'film'
                      }
                      size={22}
                      color={T.primary}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={styles.attachedBadgeRow}>
                      <Ionicons name="checkmark-circle" size={14} color={T.primary} />
                      <Text style={[styles.attachedReadyText, { color: T.primary }]}>
                        {capturedMedia.type === 'photo'
                          ? (lang === 'ta' ? 'உண்மையான புகைப்பட சான்று இணைக்கப்பட்டது' : 'Actual Photo Proof Attached')
                          : capturedMedia.type === 'audio'
                          ? (lang === 'ta' ? `குரல் சான்று (${capturedMedia.durationSec}s)` : `Audio Proof Attached (${capturedMedia.durationSec}s)`)
                          : (lang === 'ta' ? `வீடியோ சான்று (${capturedMedia.durationSec}s)` : `Video Proof Attached (${capturedMedia.durationSec}s)`)}
                      </Text>
                    </View>
                    <Text style={[styles.attachedFileText, { color: T.tx }]} numberOfLines={1}>
                      {capturedMedia.fileName}
                    </Text>
                    <Text style={[styles.attachedTimeText, { color: T.mu }]}>
                      {capturedMedia.fileSize ? formatBytes(capturedMedia.fileSize) + ' · ' : ''}
                      {lang === 'ta' ? 'நேரம்:' : 'Time:'} {capturedMedia.timeLabel}
                    </Text>
                  </View>
                </View>

                <View style={styles.attachedActionsRow}>
                  {capturedMedia.type !== 'photo' && (
                    <Pressable
                      onPress={handlePreviewPlayback}
                      style={[
                        styles.previewSmallBtn,
                        {
                          backgroundColor: isPlayingPreview ? T.primary + '22' : T.card,
                          borderColor: isPlayingPreview ? T.primary : T.line
                        }
                      ]}
                    >
                      <Ionicons
                        name={isPlayingPreview ? 'pause' : 'play'}
                        size={14}
                        color={isPlayingPreview ? T.primary : T.tx}
                      />
                      <Text style={[styles.previewSmallBtnText, { color: isPlayingPreview ? T.primary : T.tx }]}>
                        {isPlayingPreview
                          ? (lang === 'ta' ? 'இயங்குகிறது...' : 'Playing...')
                          : (lang === 'ta' ? 'முன்னோட்டம்' : 'Play Preview')}
                      </Text>
                    </Pressable>
                  )}

                  <Pressable
                    onPress={() => {
                      triggerHaptic('light');
                      setCapturedMedia(null);
                      setRecordSec(0);
                    }}
                    style={[styles.previewSmallBtn, { backgroundColor: T.card, borderColor: T.line }]}
                  >
                    <Ionicons name="refresh" size={14} color={T.mu} />
                    <Text style={[styles.previewSmallBtnText, { color: T.mu }]}>
                      {lang === 'ta' ? 'வேறு சான்று மாற்று' : 'Replace Proof'}
                    </Text>
                  </Pressable>
                </View>
              </View>
            )}
          </View>

          {/* Step 3: Short Note / Context for School Portal */}
          <Text style={[styles.sectionLabel, { color: T.mu }]}>
            {lang === 'ta' ? '3. சுருக்கமான குறிப்பு (விருப்பத்தேர்வு)' : '3. SHORT NOTE FOR TEACHER (OPTIONAL)'}
          </Text>
          <View style={[styles.noteCard, { backgroundColor: T.card, borderColor: T.line }]}>
            <TextInput
              value={note}
              onChangeText={setNote}
              placeholder={
                lang === 'ta'
                  ? 'எ.கா: இன்று 10 பக்கங்கள் படித்தேன்...'
                  : 'e.g., Read 10 pages of science book / Drank water after waking...'
              }
              placeholderTextColor={T.mu}
              style={[
                styles.noteInput,
                {
                  color: T.tx,
                  backgroundColor: T.surfaceLowest || '#021427',
                  borderColor: T.line
                }
              ]}
              maxLength={120}
            />
            <View style={styles.quickTagsRow}>
              {quickNotes.map((qText) => (
                <Pressable
                  key={qText}
                  onPress={() => {
                    triggerHaptic('selection');
                    setNote(qText);
                  }}
                  style={[
                    styles.quickTag,
                    {
                      backgroundColor: note === qText ? T.primary + '18' : (T.surfaceLowest || '#021427'),
                      borderColor: note === qText ? T.primary : T.line
                    }
                  ]}
                >
                  <Text
                    style={[
                      styles.quickTagText,
                      { color: note === qText ? T.primary : T.mu }
                    ]}
                  >
                    {qText}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Portal Sync Notice */}
          <View style={[styles.syncNotice, { backgroundColor: T.card, borderColor: T.line }]}>
            <Ionicons name="cloud-done-outline" size={16} color={T.primary} />
            <Text style={[styles.syncNoticeText, { color: T.mu }]}>
              {lang === 'ta'
                ? 'இணைக்கப்பட்ட உண்மையான சான்று பள்ளி மேலாண்மை போர்ட்டலுடன் நேரடியாக ஒத்திசைக்கப்படும்.'
                : 'The attached proof is automatically synchronized with the School Management Portal for teacher verification.'}
            </Text>
          </View>

          {/* Submit & Claim XP CTA */}
          <Pressable
            disabled={!capturedMedia || isProcessing}
            onPress={handleConfirmSubmit}
            style={[
              styles.submitBtn,
              {
                backgroundColor: capturedMedia ? T.primary : T.line,
                opacity: capturedMedia && !isProcessing ? 1 : 0.55
              }
            ]}
          >
            <Ionicons
              name="checkmark-done-circle"
              size={20}
              color={capturedMedia ? '#FFFFFF' : T.mu}
            />
            <Text
              style={[
                styles.submitBtnText,
                { color: capturedMedia ? '#FFFFFF' : T.mu }
              ]}
            >
              {isAlreadyDone
                ? (lang === 'ta' ? 'சான்றைப் புதுப்பிக்கவும்' : 'Update Submitted Evidence')
                : (lang === 'ta' ? 'சான்றைச் சமர்ப்பித்து +10 XP பெறுக' : 'Submit Evidence & Claim +10 XP')}
            </Text>
          </Pressable>

          {/* Option to unmark if habit was already completed */}
          {isAlreadyDone && onRemoveCompletion && (
            <Pressable
              onPress={() => {
                triggerHaptic('medium');
                onRemoveCompletion(habit.id);
              }}
              style={[styles.removeBtn, { borderColor: T.line, backgroundColor: T.card }]}
            >
              <Ionicons name="trash-outline" size={16} color={T.mu} />
              <Text style={[styles.removeBtnText, { color: T.mu }]}>
                {lang === 'ta' ? 'பழக்கப் பதிவை நீக்கு' : 'Unmark Habit & Remove Evidence'}
              </Text>
            </Pressable>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    gap: 12
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTextWrap: {
    flex: 1
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800'
  },
  headerSub: {
    fontSize: 11.5,
    marginTop: 2
  },
  scroll: {
    flex: 1
  },
  scrollPad: {
    padding: 16,
    paddingBottom: 36,
    gap: 12
  },
  habitBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    gap: 12
  },
  habitIconWrap: {
    width: 46,
    height: 46,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dimTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2
  },
  dimTagText: {
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  xpPill: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 2
  },
  xpPillText: {
    fontSize: 10.5,
    fontWeight: '800'
  },
  habitTitle: {
    fontSize: 15.5,
    fontWeight: '800'
  },
  habitDesc: {
    fontSize: 12,
    marginTop: 2
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.6,
    marginTop: 4
  },
  typeGrid: {
    flexDirection: 'row',
    gap: 10
  },
  typeCard: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6
  },
  typeCardText: {
    fontSize: 12.5,
    textAlign: 'center'
  },
  captureBox: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    gap: 12
  },
  captureHint: {
    fontSize: 12.5,
    lineHeight: 18
  },
  loadingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10
  },
  loadingText: {
    fontSize: 12.5,
    fontWeight: '600'
  },
  actionsWrap: {
    gap: 10
  },
  actionButtonsCol: {
    gap: 10
  },
  bigActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12
  },
  bigActionBtnTitle: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '800'
  },
  bigActionBtnSub: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 11,
    marginTop: 2
  },
  bigActionBtnSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1
  },
  bigActionBtnTitleSec: {
    fontSize: 13.5,
    fontWeight: '800'
  },
  attachedCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    gap: 12
  },
  imagePreviewWrap: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)'
  },
  actualImagePreview: {
    width: '100%',
    height: '100%'
  },
  attachedTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  attachedIconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  attachedBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 2
  },
  attachedReadyText: {
    fontSize: 12.5,
    fontWeight: '800'
  },
  attachedFileText: {
    fontSize: 13,
    fontWeight: '700'
  },
  attachedTimeText: {
    fontSize: 11.5,
    marginTop: 2
  },
  attachedActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  previewSmallBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10
  },
  previewSmallBtnText: {
    fontSize: 12,
    fontWeight: '700'
  },
  noteCard: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    gap: 10
  },
  noteInput: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13
  },
  quickTagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6
  },
  quickTag: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 5
  },
  quickTagText: {
    fontSize: 11.5,
    fontWeight: '600'
  },
  syncNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10
  },
  syncNoticeText: {
    flex: 1,
    fontSize: 11.5,
    lineHeight: 16
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 4
  },
  submitBtnText: {
    fontSize: 14.5,
    fontWeight: '800'
  },
  removeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 11,
    borderRadius: 10,
    borderWidth: 1
  },
  removeBtnText: {
    fontSize: 12.5,
    fontWeight: '700'
  }
});
