import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Dimensions 
} from 'react-native';


const QuickStartGuide = ({ onComplete, isDarkMode, onToggleDarkMode }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const screenWidth = Dimensions.get('window').width;
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const slides = [
    {
      title: "Welcome to FinVerse!",
      description: "One App to manage all your entire financial life.",
      description2: "from tracking investments to paying bills - simplfy everything in one powerfull dashboard.",
      icon: "🚀"
    },
    {
      title: "Know you wealth instantly",
      description: "unified portfolio across funds stocks and goals",
      description2: "View all your investments returns and savings goals at a glance - anytime anywhere",
      icon: "🧭"
    },
    {
      title: "Smart Analytics",
      description: "Get insights into your spending patterns and financial health.",
      description2: "Track your progress and make informed financial decisions.",
      icon: "📊"
    },
    {
      title: "Ready to Go!",
      description: "You're all set! Start exploring and make the most of your new app experience.",
      description2: "Begin your journey towards better financial management today.",
      icon: "✨"
    }
  ];

  const nextSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const skipGuide = () => {
    onComplete();
  };

  // Touch handlers for swipe functionality
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.nativeEvent.pageX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.nativeEvent.pageX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 100; // Increased threshold
    const isRightSwipe = distance < -100; // Increased threshold

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
    
    // Reset touch states
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <View style={[styles.guideContainer, isDarkMode && styles.guideContainerDark]}>
      <View 
        style={styles.slideContainer}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Text style={styles.slideIcon}>{slides[currentSlide].icon}</Text>
        <Text style={[styles.slideTitle, isDarkMode && styles.slideTitleDark]}>{slides[currentSlide].title}</Text>
        <Text style={[styles.slideDescription, isDarkMode && styles.slideDescriptionDark]}>{slides[currentSlide].description}</Text>
        {slides[currentSlide].description2 && (
          <Text style={[styles.slideDescription2, isDarkMode && styles.slideDescription2Dark]}>{slides[currentSlide].description2}</Text>
        )}
        <Text style={[styles.slideCounter, isDarkMode && styles.slideCounterDark]}>
          Slide {currentSlide + 1} of {slides.length}
        </Text>
      </View>
      
      <View style={styles.slideIndicators}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              index === currentSlide && styles.activeIndicator
            ]}
          />
        ))}
      </View>

      <View style={styles.slideButtons}>
        <TouchableOpacity style={styles.skipButton} onPress={skipGuide}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
        
        <View style={styles.navButtons}>
          {currentSlide > 0 && (
            <TouchableOpacity style={styles.backButton} onPress={prevSlide}>
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity style={styles.nextButton} onPress={nextSlide}>
            <Text style={styles.nextButtonText}>
              {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  guideContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  slideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slideIcon: {
    fontSize: 80,
    marginBottom: 30,
  },
  slideTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  slideDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  slideDescription2: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  slideIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ddd',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#2196F3',
    width: 24,
  },
  slideButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 40,
  },
  skipButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  skipButtonText: {
    color: '#666',
    fontSize: 16,
  },
  navButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  backButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  backButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  slideCounter: {
    fontSize: 12,
    color: '#999',
    marginTop: 10,
  },
  // Dark Mode Styles
  guideContainerDark: {
    backgroundColor: '#1a1a1a',
  },
  slideTitleDark: {
    color: '#fff',
  },
  slideDescriptionDark: {
    color: '#ccc',
  },
  slideDescription2Dark: {
    color: '#ccc',
  },
  slideCounterDark: {
    color: '#666',
  },
  // Dark Mode Toggle Styles
  darkModeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  darkModeButtonDark: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  darkModeIcon: {
    fontSize: 24,
  },
  darkModeIconDark: {
    fontSize: 24,
  },
});

export default QuickStartGuide;
