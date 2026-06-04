import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

const coursesData = {
  'React Native Basics': [
    { title: '1. Introduction to React Native', videoId: 'gvkqT_Uoahw' },
    { title: '2. Setting up the Environment', videoId: '0-S5a0eXPoc' },
    { title: '3. Understanding Components', videoId: 'Hf4O6ihM8AM' },
  ],
  'JavaScript Course': [
    { title: '1. Variables and Data Types', videoId: 'W6NZfCO5SIk' },
    { title: '2. Functions & Arrow Functions', videoId: '2gAkDb6ndSM' },
  ],
  'Mobile App Development': [
    { title: '1. Mobile Ecosystem Overview', videoId: 'gvkqT_Uoahw' },
  ]
};

const filesData = [
  { name: 'Lecture 1: Introduction Notes.pdf', size: '2.4 MB' },
  { name: 'Lecture 2: Environment Setup Guide.pdf', size: '1.8 MB' },
  { name: 'JavaScript Core Concepts CheatSheet.pdf', size: '4.1 MB' },
  { name: 'Mobile UI/UX Design Slides.pdf', size: '5.5 MB' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('Courses');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeVideoId, setActiveVideoId] = useState(null);

  const handleFilePress = (fileName) => {
    alert(`Downloading: ${fileName}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.mainContent}>
        
        {activeTab === 'Courses' && (
          <View style={{ flex: 1 }}>
            {!selectedCourse ? (
              <View>
                <Text style={styles.headerTitle}>My Courses</Text>
                <View style={styles.coursesContainer}>
                  {Object.keys(coursesData).map((courseName, index) => (
                    <TouchableOpacity 
                      key={index}
                      style={styles.courseCard} 
                      onPress={() => {
                        setSelectedCourse(courseName);
                        setActiveVideoId(null);
                      }}
                    >
                      <Text style={styles.courseNumber}>{index + 1}-</Text>
                      <Text style={styles.courseText}>{courseName}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ) : (
              <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity 
                  style={styles.backButton} 
                  onPress={() => {
                    setSelectedCourse(null);
                    setActiveVideoId(null);
                  }}
                >
                  <Text style={styles.backButtonText}>⬅ Back to Courses</Text>
                </TouchableOpacity>

                <Text style={styles.headerTitle}>{selectedCourse}</Text>

                {activeVideoId && (
                  <View style={styles.videoPlayerContainer}>
                    <iframe
                      width="100%"
                      height="220"
                      src={`https://www.youtube.com/embed/${activeVideoId}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ borderRadius: 12 }}
                    ></iframe>
                  </View>
                )}

                <Text style={styles.subTitle}>Lessons:</Text>

                <View style={styles.videosContainer}>
                  {coursesData[selectedCourse].map((video, index) => {
                    const isPlaying = activeVideoId === video.videoId;
                    return (
                      <TouchableOpacity 
                        key={index} 
                        style={[styles.videoCard, isPlaying && styles.playingCard]}
                        onPress={() => setActiveVideoId(video.videoId)}
                      >
                        <Text style={[styles.videoText, isPlaying && styles.playingText]}>
                          {video.title}</Text>
                        <Text style={[styles.playIcon, isPlaying && styles.playingIcon]}>
                          {isPlaying ? '⏸' : '▶'}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ScrollView>
            )}
          </View>
        )}

        {activeTab === 'Files' && (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.headerTitle}>Study Materials</Text>
            <Text style={styles.subTitle}>Download PDFs, Slides and Summaries:</Text>
            <View style={styles.filesContainer}>
              {filesData.map((file, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.fileCard}
                  onPress={() => handleFilePress(file.name)}
                >
                  <View>
                    <Text style={styles.fileText}>{file.name}</Text>
                    <Text style={styles.fileSize}>{file.size}</Text>
                  </View>
                  <Text style={styles.downloadIcon}>📥</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )}

        {activeTab === 'Profile' && (
          <View style={styles.profileContainer}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>AA</Text>
            </View>
            <Text style={styles.profileName}>Abdullah Ammar Ali</Text>
            <Text style={styles.profileLabel}>Student</Text>
            
            <View style={styles.infoBox}>
              <View style={styles.infoRow}>
                <Text style={styles.infoKey}>University:</Text>
                <Text style={styles.infoValue}>Imam Ja'afar Al-Sadiq University</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoKey}>Major:</Text>
                <Text style={styles.infoValue}>Pharmacy & Medicinal Sciences</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoKey}>Location:</Text>
                <Text style={styles.infoValue}>Baghdad, Iraq</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoKey}>Status:</Text>
                <Text style={styles.infoValue}>Active Learner</Text>
              </View>
            </View>
          </View>
        )}

      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tabItem, activeTab === 'Courses' && styles.activeTabItem]} 
          onPress={() => setActiveTab('Courses')}
        >
          <Text style={[styles.tabIcon, activeTab === 'Courses' && styles.activeTabIcon]}>📚</Text>
          <Text style={[styles.tabLabel, activeTab === 'Courses' && styles.activeTabLabel]}>Courses</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tabItem, activeTab === 'Files' && styles.activeTabItem]} 
          onPress={() => setActiveTab('Files')}
        >
          <Text style={[styles.tabIcon, activeTab === 'Files' && styles.activeTabIcon]}>📁</Text>
          <Text style={[styles.tabLabel, activeTab === 'Files' && styles.activeTabLabel]}>Files</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tabItem, activeTab === 'Profile' && styles.activeTabItem]} 
          onPress={() => setActiveTab('Profile')}
        >
          <Text style={[styles.tabIcon, activeTab === 'Profile' && styles.activeTabIcon]}>👤</Text>
          <Text style={[styles.tabLabel, activeTab === 'Profile' && styles.activeTabLabel]}>Profile</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',color: '#333',
    marginBottom: 10,
    marginTop: 10,
  },
  subTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  coursesContainer: {
    marginTop: 10,
  },
  courseCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, 
    alignItems: 'center',
    cursor: 'pointer',
  },
  courseNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF', 
    marginRight: 10,
  },
  courseText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
  },
  backButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#e0e0e0',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginBottom: 10,
    cursor: 'pointer',
  },
  backButtonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 14,
  },
  videoPlayerContainer: {
    width: '100%',
    backgroundColor: '#000',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  videosContainer: {
    marginTop: 5,
  },
  videoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderLeftWidth: 5,
    borderLeftColor: '#007AFF',
    cursor: 'pointer',
  },
  playingCard: {
    backgroundColor: '#E1F0FF', 
    borderLeftColor: '#34C759', 
  },
  videoText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  playingText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  playIcon: {
    fontSize: 18,
    color: '#007AFF',
  },
  playingIcon: {
    color: '#34C759',
  },
  filesContainer: {
    marginTop: 10,
  },
  fileCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    cursor: 'pointer',
  },
  fileText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  fileSize: {
    fontSize: 12,
    color: '#888',
  },
  downloadIcon: {
    fontSize: 20,
    color: '#007AFF',
  },
  profileContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  avatarCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  profileLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    marginBottom: 25,
  },
  infoBox: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  infoKey: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  tabBar: {
    flexDirection: 'row',
    height: 65,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 5,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',flex: 1,
    height: '100%',
    cursor: 'pointer',
  },
  activeTabItem: {
    borderTopWidth: 3,
    borderTopColor: '#007AFF',
  },
  tabIcon: {
    fontSize: 20,
    color: '#888',
    marginBottom: 2,
  },
  activeTabIcon: {
    color: '#007AFF',
  },
  tabLabel: {
    fontSize: 12,
    color: '#888',
    fontWeight: '500',
  },
  activeTabLabel: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});