import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerLogo: {
    width: 60,
    height: 60,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  subText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
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
  // Dark Mode Styles
  loadingContainerDark: {
    backgroundColor: '#1a1a1a',
  },
  containerDark: {
    backgroundColor: '#1a1a1a',
  },
  headerDark: {
    backgroundColor: '#2a2a2a',
    borderBottomColor: '#333',
  },
  welcomeTextDark: {
    color: '#fff',
  },
  descriptionTextDark: {
    color: '#ccc',
  },
  subTextDark: {
    color: '#999',
  },
  // Home specific styles
  homeHeader: {
    paddingTop: 8,
    paddingBottom: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  simpleTopHeader: {
    paddingTop: 50,
    paddingBottom: 6,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  simpleTopHeaderTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  roundIconBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundIconText: {
    fontSize: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  pageTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  avatarWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    overflow: 'hidden',
    marginRight: 12,
    backgroundColor: '#e5e7eb',
  },
  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerTextWrap: {
    flex: 1,
  },
  welcomeTiny: {
    fontSize: 12,
    marginBottom: 2,
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
  },
  portfolioTiny: {
    fontSize: 12,
    marginTop: 6,
  },
  portfolioValue: {
    fontSize: 16,
    fontWeight: '700',
  },

  segmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  segmentBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#dbe0ea',
    marginRight: 8,
  },
  segmentBtnOutline: {
    borderColor: '#2563eb',
    backgroundColor: 'transparent',
  },
  segmentBtnGradient: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
    marginRight: 8,
  },
  segmentActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  segmentText: {
    fontSize: 13,
  },
  segmentTextBlue: {
    fontSize: 13,
    color: '#2563eb',
    fontWeight: '600',
  },
  segmentActiveText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  topTabsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  topTab: {
    marginRight: 16,
  },
  topTabActive: {},
  topTabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  topTabTextActive: {
    color: '#0b1220',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryCard: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginRight: 8,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  summaryGain: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
  },
  panelCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  panelHeaderRow: {
    marginBottom: 8,
  },
  panelTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  miniTabRow: {
    flexDirection: 'row',
  },
  miniTab: {
    borderWidth: 1,
    borderColor: '#dbe0ea',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginRight: 8,
  },
  miniTabActive: {
    backgroundColor: '#eef2ff',
    borderColor: '#eef2ff',
  },
  miniTabText: {
    fontSize: 12,
  },
  miniTabTextActive: {
    color: '#0b1220',
    fontWeight: '700',
  },
  panelBodyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  portfolioBig: {
    fontSize: 22,
    fontWeight: '800',
    marginRight: 8,
  },
  greenPct: {
    color: '#16a34a',
    fontWeight: '700',
  },
  insSummary: {
    fontSize: 12,
  },
  tradeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  tradeName: {
    fontSize: 14,
    fontWeight: '600',
  },
  tradeDate: {
    fontSize: 12,
  },
  tradePnl: {
    fontSize: 14,
    fontWeight: '700',
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  activityName: {
    fontSize: 14,
    fontWeight: '600',
  },
  activityDate: {
    fontSize: 12,
  },
  activityAmount: {
    fontSize: 14,
    fontWeight: '700',
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 42,
    marginBottom: 10,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  subTabsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 6,
  },
  subTab: {
    marginRight: 18,
    paddingVertical: 8,
  },
  subTabText: {
    fontSize: 14,
  },
  subTabTextActive: {
    color: '#0b1220',
    fontWeight: '700',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  viewAll: {
    fontSize: 13,
    fontWeight: '600',
  },
  cardList: {
    marginBottom: 8,
  },
  indexCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  iconSquare: {
    width: 44,
    height: 44,
    borderRadius: 10,
    marginRight: 12,
  },
  indexTextWrap: {
    flex: 1,
  },
  indexName: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  indexSub: {
    fontSize: 12,
  },
  indexValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  holdingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  holdingIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    marginRight: 12,
  },
  holdingTextWrap: {
    flex: 1,
  },
  holdingName: {
    fontSize: 14,
    fontWeight: '700',
  },
  holdingSub: {
    fontSize: 12,
  },
  holdingValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  fab: {
    position: 'absolute',
    right: 18,
    bottom: 78,
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  fabIcon: {
    fontSize: 22,
    color: '#ffffff',
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 58,
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  bottomItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomIcon: {
    fontSize: 14,
    marginBottom: 2,
  },
  bottomText: {
    fontSize: 12,
    fontWeight: '600',
  },
  // Mutual funds styles
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 34,
    marginRight: 8,
  },
  chipText: {
    fontSize: 13,
    marginRight: 6,
  },
  chipArrow: {
    fontSize: 12,
  },
  metaTiny: {
    fontSize: 12,
    marginBottom: 6,
  },
  fundRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  fundIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    marginRight: 12,
  },
  fundTextWrap: {
    flex: 1,
  },
  fundName: {
    fontSize: 14,
    fontWeight: '700',
  },
  fundManager: {
    fontSize: 12,
  },
  fundReturn: {
    fontSize: 14,
    fontWeight: '700',
  },
  filterIcon: {
    fontSize: 16,
  },
  // Finance grid and policy styles
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '31%',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 10,
    alignItems: 'center',
  },
  gridIcon: {
    fontSize: 22,
    marginBottom: 6,
  },
  gridLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  policyCard: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  policyImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginRight: 12,
  },
  policyTextWrap: {
    flex: 1,
  },
  policyName: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  policyDetails: {
    fontSize: 12,
    marginBottom: 10,
  },
  policyActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  policyBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  policyBtnText: {
    fontSize: 12,
    fontWeight: '600',
  },
  policyBtnOutline: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  policyBtnOutlineText: {
    fontSize: 12,
    fontWeight: '700',
  },
  // Loans panel styles
  loanPanel: {
    borderWidth: 1,
    borderRadius: 14,
    overflow: 'hidden',
  },
  loanRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  loanIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  loanIcon: {
    fontSize: 18,
  },
  loanTextWrap: {
    flex: 1,
  },
  loanTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  loanDetail: {
    fontSize: 12,
  },
  chevron: {
    fontSize: 24,
    paddingHorizontal: 4,
  },
  viewAllPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#2563eb',
  },
  viewAllPillText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  // Payment interface styles
  balanceCard: {
    borderRadius: 16,
    marginBottom: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  balanceCardContent: {
    flex: 1,
  },
  balanceProfileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  balanceProfilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    marginRight: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  balanceProfileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  balanceTextSection: {
    flex: 1,
  },
  balanceUserName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  balanceLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  balanceButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addAmountBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  addAmountIcon: {
    fontSize: 18,
    color: '#ffffff',
    marginRight: 6,
    fontWeight: 'bold',
  },
  addAmountText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
  },
  addAccountBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginLeft: 8,
  },
  addAccountIcon: {
    fontSize: 18,
    color: '#ffffff',
    marginRight: 6,
    fontWeight: 'bold',
  },
  addAccountText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
  },
  moneyTransactionSection: {
    marginBottom: 24,
  },
  moneyTransactionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  transactionOptionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  transactionOption: {
    alignItems: 'center',
    flex: 1,
  },
  transactionIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  transactionIconText: {
    fontSize: 20,
  },
  transactionLabel: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
  viewAllLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
  viewAllArrow: {
    fontSize: 14,
    fontWeight: '600',
  },
  transactionsSection: {
    marginBottom: 24,
  },
  transactionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  transactionsList: {
    marginBottom: 12,
  },
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  transactionAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  transactionAvatarText: {
    fontSize: 16,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  transactionTime: {
    fontSize: 12,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Payment header styles
  paymentHeader: {
    paddingTop: 50,
    paddingBottom: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  paymentHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paymentHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentProfilePic: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 12,
    backgroundColor: '#e5e7eb',
  },
  paymentProfileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  // Money Transaction Page styles
  moneyTransactionPage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  moneyTransactionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    fontSize: 16,
    fontWeight: '600',
  },
  moneyTransactionPageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  moneyTransactionContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  welcomeSection: {
    paddingTop: 20,
    paddingBottom: 16,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  balanceCardNew: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  balanceCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  balanceLabel: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  visaLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  cardNumber: {
    fontSize: 18,
    color: '#ffffff',
    letterSpacing: 2,
    marginBottom: 20,
  },
  balanceCardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardHolder: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
  },
  expiry: {
    fontSize: 16,
    color: '#ffffff',
  },
  addAccountButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  addAccountIcon: {
    fontSize: 18,
    color: '#ffffff',
    marginRight: 8,
    fontWeight: 'bold',
  },
  addAccountText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
  },
  portfolioCardNew: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
  },
  portfolioTitleNew: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  portfolioValueSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  portfolioValueNew: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 12,
  },
  portfolioGain: {
    fontSize: 16,
    color: '#16a34a',
    fontWeight: '600',
    marginRight: 12,
  },
  chartEmoji: {
    fontSize: 20,
  },
  portfolioTabs: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  portfolioTab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  portfolioTabActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  portfolioTabText: {
    fontSize: 14,
  },
  portfolioTabTextActive: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
  },
  viewInvestments: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewInvestmentsText: {
    fontSize: 14,
    marginRight: 4,
  },
  viewInvestmentsArrow: {
    fontSize: 14,
  },
  insuranceCardNew: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
  },
  insuranceHeaderNew: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  insuranceTitleNew: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  insuranceIconNew: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eef2ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  insuranceIconText: {
    fontSize: 20,
  },
  insurancePolicies: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  insuranceStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  activeStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#16a34a',
    marginRight: 6,
  },
  activeText: {
    fontSize: 14,
    color: '#16a34a',
    fontWeight: '600',
  },
  expiringStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expiringIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  expiringText: {
    fontSize: 14,
    color: '#ef4444',
    fontWeight: '600',
  },
  managePlans: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  managePlansText: {
    fontSize: 14,
    marginRight: 4,
  },
  managePlansArrow: {
    fontSize: 14,
  },
  recentActivityCardNew: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
  },
  recentActivityTitleNew: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  activityListNew: {
    marginBottom: 16,
  },
  activityItemNew: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  activityInfoNew: {
    flex: 1,
  },
  activityNameNew: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  activityDateNew: {
    fontSize: 14,
  },
  activityAmountRed: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ef4444',
  },
  activityAmountGreen: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#16a34a',
  },
  viewAllActivity: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllActivityText: {
    fontSize: 14,
    marginRight: 4,
  },
  viewAllActivityArrow: {
    fontSize: 14,
  },
  // Profile Screen Styles
  profileContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    backgroundColor: '#ffffff',
  },
  profileContainerDark: {
    backgroundColor: '#1a1a1a',
  },
  profileHeader: {
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  profileHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    marginBottom: 12,
    backgroundColor: '#e5e7eb',
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  editProfileBtn: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editProfileText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 18,
    marginRight: 12,
    color: '#3B82F6',
  },
  actionText: {
    fontSize: 16,
    fontWeight: '600',
  },
  actionArrow: {
    fontSize: 18,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  sectionTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '600',
  },
  menuItemArrow: {
    fontSize: 18,
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Settings Bottom Sheet
  settingsBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.35)',
    zIndex: 9998,
    elevation: 12,
  },
  settingsSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '86%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 14,
    zIndex: 9999,
    backgroundColor: '#2563eb',
  },
  sheetPillBtn: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  sheetPillBtnText: {
    color: '#0b1220',
    fontSize: 14,
    fontWeight: '700',
  },
  notificationSection: {
    marginBottom: 24,
  },
  notificationSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  notificationItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  notificationItemIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  notificationItemText: {
    flex: 1,
  },
  notificationItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  notificationItemDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  toggleSwitch: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleSwitchOn: {
    backgroundColor: '#3B82F6',
  },
  toggleKnob: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleKnobOn: {
    alignSelf: 'flex-end',
  },
  bankAccountCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  bankAccountLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bankIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  bankAccountInfo: {
    flex: 1,
  },
  bankName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bankAccountNumber: {
    fontSize: 14,
  },
  addAccountButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  addAccountButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  supportSection: {
    marginBottom: 24,
  },
  supportSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  supportItem: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  supportItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  supportItemIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  supportItemText: {
    flex: 1,
  },
  supportItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  supportItemDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
});
