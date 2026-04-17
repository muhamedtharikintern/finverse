// Temp file to store changes
export default function HomePage({ showGuide, onGuideComplete, isDarkMode }) {
  const [showStockDetails, setShowStockDetails] = useState(null);

  const textColor = isDarkMode ? '#fff' : '#0b1220';
  const surface = isDarkMode ? '#111827' : '#ffffff';
  const cardBg = isDarkMode ? '#1f2937' : '#f4f6f9';

  return (
    <View style={styles.container}>
      {showStockDetails ? (
        <StockDetails
          stock={showStockDetails}
          onBack={() => setShowStockDetails(null)}
        />
      ) : (
        <>
          {/* Market Indices */}
          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionTitle, { color: textColor }]}>Market Indices</Text>
            <TouchableOpacity>
              <Text style={[styles.viewAll, { color: '#3b82f6' }]}>View All →</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cardList}>
            {[
              { name: 'NIFTY 50', value: '17,500', change: '+1.2%' },
              { name: 'Sensex', value: '59,000', change: '+0.8%' },
            ].map((i) => (
              <TouchableOpacity
                key={i.name}
                style={[styles.indexCard, { backgroundColor: surface, borderColor: isDarkMode ? '#222' : '#eef0f4' }]}
                onPress={() => setShowStockDetails({ ...i, type: 'index' })}
              >
                <View style={[styles.iconSquare, { backgroundColor: cardBg }]} />
                <View style={styles.indexTextWrap}>
                  <Text style={[styles.indexName, { color: textColor }]}>{i.name}</Text>
                  <Text style={[styles.indexSub, { color: '#3b82f6' }]}>Current Value</Text>
                </View>
                <Text style={[styles.indexValue, { color: textColor }]}>{i.value}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Current Holdings */}
          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionTitle, { color: textColor }]}>Current Holdings</Text>
            <TouchableOpacity>
              <Text style={[styles.viewAll, { color: '#3b82f6' }]}>View All →</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.cardList}>
            {[
              { name: 'TechCorp Inc.', shares: '10 Shares', price: '$1,234.56', change: '+2.5%' },
              { name: 'Global Energy Ltd.', shares: '5 Shares', price: '$678.90', change: '-0.8%' },
            ].map((h) => (
              <TouchableOpacity
                key={h.name}
                style={[styles.holdingCard, { backgroundColor: surface, borderColor: isDarkMode ? '#222' : '#eef0f4' }]}
                onPress={() => setShowStockDetails({ ...h, type: 'stock' })}
              >
                <View style={[styles.holdingIcon, { backgroundColor: cardBg }]} />
                <View style={styles.holdingTextWrap}>
                  <Text style={[styles.holdingName, { color: textColor }]}>{h.name}</Text>
                  <Text style={[styles.holdingSub, { color: mutedColor }]}>{h.shares}</Text>
                </View>
                <Text style={[styles.holdingValue, { color: textColor }]}>{h.price}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
    </View>
  );
}