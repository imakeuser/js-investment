// JS Investment Application Logic
(function() {
  // Register Chart.js DataLabels plugin globally if available
  if (typeof ChartDataLabels !== 'undefined') {
    Chart.register(ChartDataLabels);
  }

  // Pre-loaded complete Korean dataset (2026.06.28 & 2026.09.12)
  const INITIAL_DATA = [
    {
      "date": "2026-06-28",
      "timestamp": "2026.06.28 18:33:12",
      "totalBuy": 386624572,
      "totalEval": 520712895,
      "totalProfit": 134056928,
      "returnRate": 34.67,
      "items": [
        { "account": "7075******-01 [종합(비대면)]", "name": "TIGER 미국우주테크", "qty": 13.0, "price": 9150.0, "buy": 146950, "eval": 118950, "profit": -28000, "returnRate": -19.05 },
        { "account": "7075******-01 [종합(비대면)]", "name": "한국전력1065", "qty": 33000.0, "price": 10016.0, "buy": 29393, "eval": 33054, "profit": 3661, "returnRate": 12.46 },
        { "account": "7075******-01 [종합(비대면)]", "name": "USD(외화예수금)", "qty": 0.04, "price": 1545.3, "buy": 0, "eval": 61, "profit": 0, "returnRate": 0.0 },
        { "account": "7075******-01 [종합(비대면)]", "name": "현금잔고(예수금)", "qty": 0.0, "price": 0.0, "buy": 0, "eval": 12934, "profit": 0, "returnRate": 0.0 },
        { "account": "7075******-29 [퇴직연금(IRP)]", "name": "현금잔고(예수금)", "qty": 0.0, "price": 0.0, "buy": 0, "eval": 135, "profit": 0, "returnRate": 0.0 },
        { "account": "7075******-29 [퇴직연금(IRP)]", "name": "TIGER 미국나스닥100", "qty": 47.0, "price": 197725.0, "buy": 3479305, "eval": 9293075, "profit": 5813770, "returnRate": 167.1 },
        { "account": "7075******-29 [퇴직연금(IRP)]", "name": "ACE 베트남VN30(합성)", "qty": 65.0, "price": 32400.0, "buy": 1687480, "eval": 2106000, "profit": 418520, "returnRate": 24.8 },
        { "account": "7075******-29 [퇴직연금(IRP)]", "name": "ACE KRX금현물", "qty": 296.0, "price": 27120.0, "buy": 3384500, "eval": 8027520, "profit": 4643020, "returnRate": 137.18 },
        { "account": "7075******-29 [퇴직연금(IRP)]", "name": "SOL 미국배당다우존스", "qty": 270.0, "price": 13350.0, "buy": 2623765, "eval": 3604500, "profit": 980735, "returnRate": 37.38 },
        { "account": "7075******-29 [퇴직연금(IRP)]", "name": "TIGER TDF2045 적격", "qty": 146.0, "price": 12285.0, "buy": 1702855, "eval": 1793610, "profit": 90755, "returnRate": 5.33 },
        { "account": "7075******-29 [퇴직연금(IRP)]", "name": "피델리티글로벌금융주(주식-재간접)-CP-e", "qty": 826333.0, "price": 2086.0, "buy": 1232746, "eval": 1723918, "profit": 491172, "returnRate": 39.84 },
        { "account": "7075******-29 [퇴직연금(IRP)]", "name": "iM에셋공모주플러스증권투자1(채혼)-C-Pe", "qty": 2366101.0, "price": 1202.0, "buy": 2488390, "eval": 2843386, "profit": 354996, "returnRate": 14.27 },
        { "account": "7075******-29 [퇴직연금(IRP)]", "name": "미래전략배분적격TDF2045혼합자산자-C-P2e", "qty": 2776680.0, "price": 2445.0, "buy": 4064618, "eval": 6788983, "profit": 2724365, "returnRate": 67.03 },
        { "account": "7075******-29 [퇴직연금(IRP)]", "name": "KODEX 한국부동산리츠인프라", "qty": 360.0, "price": 5125.0, "buy": 1848150, "eval": 1845000, "profit": -3150, "returnRate": -0.17 },
        { "account": "7075******-29 [퇴직연금(IRP)]", "name": "현금성자산(삼성증권)", "qty": 0.0, "price": 0.0, "buy": 1861602, "eval": 1858548, "profit": -3054, "returnRate": -0.16 },
        { "account": "7075******-29 [퇴직연금(IRP)]", "name": "예수금합계(삼성증권)", "qty": 52216.0, "price": 0.0, "buy": 52216, "eval": 52216, "profit": 0, "returnRate": 0.0 },
        { "account": "7126******-15 [연금저축 CMA(비대면)(회사지원)]", "name": "삼성신종종류형MMF제4호-CP", "qty": 938045.0, "price": 1016.0, "buy": 952593, "eval": 952844, "profit": 251, "returnRate": 0.03 },
        { "account": "7126******-15 [연금저축 CMA(비대면)(회사지원)]", "name": "미래전략배분TDF2040혼합자산자-C-Pe", "qty": 6805348.0, "price": 2420.0, "buy": 11500000, "eval": 16468942, "profit": 4968942, "returnRate": 43.21 },
        { "account": "7126******-15 [연금저축 CMA(비대면)(회사지원)]", "name": "KB온국민TDF2045(주식혼합-재간접)(H)-C-Pe", "qty": 5603701.0, "price": 2187.0, "buy": 7900000, "eval": 12255294, "profit": 4355294, "returnRate": 55.13 },
        { "account": "7126******-15 [연금저축 CMA(비대면)(회사지원)]", "name": "한화LIFEPLUS자산배분TDF2045(주식혼합-재간접)-C-Pe", "qty": 5027059.0, "price": 2452.0, "buy": 7900000, "eval": 12326349, "profit": 4426349, "returnRate": 56.03 },
        { "account": "7126******-15 [연금저축 CMA(비대면)(회사지원)]", "name": "KODEX 반도체", "qty": 22.0, "price": 169000.0, "buy": 2299030, "eval": 3718000, "profit": 1418970, "returnRate": 61.72 },
        { "account": "7126******-15 [연금저축 CMA(비대면)(회사지원)]", "name": "TIGER 미국나스닥100", "qty": 189.0, "price": 197725.0, "buy": 16804870, "eval": 37369975, "profit": 20540095, "returnRate": 122.23 },
        { "account": "7126******-15 [연금저축 CMA(비대면)(회사지원)]", "name": "KODEX 은선물(H)", "qty": 895.0, "price": 9345.0, "buy": 5540890, "eval": 8363775, "profit": 2822885, "returnRate": 50.95 },
        { "account": "7126******-15 [연금저축 CMA(비대면)(회사지원)]", "name": "TIGER 미국S&P500", "qty": 1100.0, "price": 27890.0, "buy": 15417500, "eval": 30679000, "profit": 15261500, "returnRate": 98.99 },
        { "account": "7126******-15 [연금저축 CMA(비대면)(회사지원)]", "name": "KODEX 미국S&P500TR", "qty": 188.0, "price": 25330.0, "buy": 3766435, "eval": 4762040, "profit": 995605, "returnRate": 26.43 },
        { "account": "7126******-15 [연금저축 CMA(비대면)(회사지원)]", "name": "ACE KRX금현물", "qty": 1199.0, "price": 27120.0, "buy": 18285305, "eval": 32516880, "profit": 14231575, "returnRate": 77.83 },
        { "account": "7126******-15 [연금저축 CMA(비대면)(회사지원)]", "name": "KODEX 미국커버드콜액티브", "qty": 601.0, "price": 12835.0, "buy": 7731295, "eval": 7713835, "profit": -17460, "returnRate": -0.23 },
        { "account": "7126******-15 [연금저축 CMA(비대면)(회사지원)]", "name": "KODEX 인도Nifty50", "qty": 686.0, "price": 13125.0, "buy": 8888772, "eval": 9003750, "profit": 114978, "returnRate": 1.29 },
        { "account": "7126******-15 [연금저축 CMA(비대면)(회사지원)]", "name": "KODEX iShares미국인플레이션국채액티브", "qty": 600.0, "price": 10220.0, "buy": 6064500, "eval": 6132000, "profit": 67500, "returnRate": 1.11 },
        { "account": "7126******-15 [연금저축 CMA(비대면)(회사지원)]", "name": "KODEX iShares미국하이일드액티브", "qty": 577.0, "price": 10595.0, "buy": 5941715, "eval": 6113315, "profit": 171600, "returnRate": 2.89 },
        { "account": "7126******-15 [연금저축 CMA(비대면)(회사지원)]", "name": "KODEX iShares미국투자등급회사채액티브", "qty": 590.0, "price": 10245.0, "buy": 6305600, "eval": 6044550, "profit": -261050, "returnRate": -4.14 },
        { "account": "7126******-15 [연금저축 CMA(비대면)(회사지원)]", "name": "KODEX 200타겟위클리커버드콜", "qty": 61.0, "price": 20435.0, "buy": 689605, "eval": 1246535, "profit": 556930, "returnRate": 80.76 },
        { "account": "7126******-15 [연금저축 CMA(비대면)(회사지원)]", "name": "KoAct 코리아액티브", "qty": 177.0, "price": 11455.0, "buy": 2415650, "eval": 2027535, "profit": -388115, "returnRate": -16.07 },
        { "account": "7126******-15 [연금저축 CMA(비대면)(회사지원)]", "name": "TIGER 미국우주테크", "qty": 237.0, "price": 9150.0, "buy": 3230195, "eval": 2168550, "profit": -1061645, "returnRate": -32.87 },
        { "account": "7126******-15 [연금저축 CMA(비대면)(회사지원)]", "name": "예수금(원화)", "qty": 0.0, "price": 0.0, "buy": 0, "eval": 7, "profit": 0, "returnRate": 0.0 },
        { "account": "7162******-01 [종합(주식보상S)(비대면)]", "name": "삼성전자", "qty": 58.0, "price": 339000.0, "buy": 9309000, "eval": 19662000, "profit": 10353000, "returnRate": 111.21 },
        { "account": "7162******-01 [종합(주식보상S)(비대면)]", "name": "예수금(원화)", "qty": 0.0, "price": 0.0, "buy": 0, "eval": 18256, "profit": 0, "returnRate": 0.0 },
        { "account": "7164******-28 [퇴직연금(DC)]", "name": "ACE 베트남VN30(합성)", "qty": 288.0, "price": 32400.0, "buy": 7825220, "eval": 9331200, "profit": 1505980, "returnRate": 19.25 },
        { "account": "7164******-28 [퇴직연금(DC)]", "name": "KODEX 200TR", "qty": 386.0, "price": 49645.0, "buy": 6494650, "eval": 19162970, "profit": 12667980, "returnRate": 195.05 },
        { "account": "7164******-28 [퇴직연금(DC)]", "name": "TIGER 미국S&P500", "qty": 285.0, "price": 27890.0, "buy": 6649595, "eval": 7948650, "profit": 1299055, "returnRate": 19.54 },
        { "account": "7164******-28 [퇴직연금(DC)]", "name": "KODEX 미국나스닥100", "qty": 307.0, "price": 29665.0, "buy": 7060390, "eval": 9107155, "profit": 2046765, "returnRate": 28.99 },
        { "account": "7164******-28 [퇴직연금(DC)]", "name": "KODEX TDF2050액티브 적격", "qty": 3311.0, "price": 18040.0, "buy": 52283910, "eval": 59730440, "profit": 7444880, "returnRate": 14.24 },
        { "account": "7164******-28 [퇴직연금(DC)]", "name": "KODEX 로봇액티브", "qty": 110.0, "price": 30205.0, "buy": 2240700, "eval": 3322550, "profit": 1081850, "returnRate": 48.28 },
        { "account": "7164******-28 [퇴직연금(DC)]", "name": "KODEX 인도Nifty50", "qty": 748.0, "price": 13125.0, "buy": 10184960, "eval": 9812180, "profit": -372780, "returnRate": -3.66 },
        { "account": "7164******-28 [퇴직연금(DC)]", "name": "TIGER 미국다우존스", "qty": 791.0, "price": 14455.0, "buy": 9752270, "eval": 11433905, "profit": 1681635, "returnRate": 17.24 },
        { "account": "7164******-28 [퇴직연금(DC)]", "name": "SOL 반도체TOP3플러스", "qty": 146.0, "price": 32800.0, "buy": 4710220, "eval": 4788800, "profit": 78580, "returnRate": 1.67 },
        { "account": "7164******-28 [퇴직연금(DC)]", "name": "KODEX iShares미국하이일드액티브", "qty": 453.0, "price": 10595.0, "buy": 5136682, "eval": 4799535, "profit": -337147, "returnRate": -6.56 },
        { "account": "7164******-28 [퇴직연금(DC)]", "name": "KODEX 국채선물10년액티브", "qty": 53.0, "price": 100785.0, "buy": 5985675, "eval": 5341605, "profit": -644070, "returnRate": -10.76 },
        { "account": "7164******-28 [퇴직연금(DC)]", "name": "KODEX 미국빅테크10", "qty": 310.0, "price": 26860.0, "buy": 6687470, "eval": 8326600, "profit": 1639130, "returnRate": 24.51 },
        { "account": "7164******-28 [퇴직연금(DC)]", "name": "KODEX 미국AI전력핵심인프라", "qty": 374.0, "price": 27015.0, "buy": 5978405, "eval": 10103610, "profit": 4125205, "returnRate": 69.0 },
        { "account": "7164******-28 [퇴직연금(DC)]", "name": "KODEX 금융고배당TOP10타겟위클리커버드콜", "qty": 738.0, "price": 10810.0, "buy": 9222005, "eval": 7977780, "profit": -1244225, "returnRate": -13.49 },
        { "account": "7164******-28 [퇴직연금(DC)]", "name": "KODEX 미국달러비상장채권액티브", "qty": 216.0, "price": 14210.0, "buy": 3260430, "eval": 3069360, "profit": -191070, "returnRate": -5.86 },
        { "account": "7164******-28 [퇴직연금(DC)]", "name": "TIGER 머니마켓액티브", "qty": 116.0, "price": 102820.0, "buy": 11731039, "eval": 11927120, "profit": 196081, "returnRate": 1.67 },
        { "account": "7164******-28 [퇴직연금(DC)]", "name": "TIGER 차이나테크TOP10", "qty": 542.0, "price": 14890.0, "buy": 6861485, "eval": 8071210, "profit": 1209725, "returnRate": 17.63 },
        { "account": "7164******-28 [퇴직연금(DC)]", "name": "KODEX 차이나달러비상장채권액티브", "qty": 386.0, "price": 7685.0, "buy": 4451400, "eval": 2966410, "profit": -1484990, "returnRate": -33.36 },
        { "account": "7164******-28 [퇴직연금(DC)]", "name": "KODEX 금양액티브", "qty": 964.0, "price": 11955.0, "buy": 12324550, "eval": 11524620, "profit": -799930, "returnRate": -6.49 },
        { "account": "7164******-28 [퇴직연금(DC)]", "name": "TIGER KRX금현물", "qty": 2726.0, "price": 12825.0, "buy": 28037200, "eval": 34961000, "profit": 6923800, "returnRate": 24.7 },
        { "account": "7164******-28 [퇴직연금(DC)]", "name": "KODEX 금융고배당TOP10", "qty": 219.0, "price": 12155.0, "buy": 2818075, "eval": 2661945, "profit": -156130, "returnRate": -5.54 },
        { "account": "7164******-28 [퇴직연금(DC)]", "name": "KODEX 원자력SMR", "qty": 200.0, "price": 15130.0, "buy": 2042000, "eval": 3026000, "profit": 984000, "returnRate": 48.19 },
        { "account": "7164******-28 [퇴직연금(DC)]", "name": "TIGER 미국우주테크", "qty": 1093.0, "price": 8490.0, "buy": 13858955, "eval": 9279450, "profit": -4579505, "returnRate": -33.04 },
        { "account": "7164******-28 [퇴직연금(DC)]", "name": "현금성자산(삼성증권)", "qty": 950435.0, "price": 0.0, "buy": 950435, "eval": 950435, "profit": 0, "returnRate": 0.0 }
      ]
    },
    {
      "date": "2026-09-12",
      "timestamp": "2026.09.12 22:37:42",
      "totalBuy": 396441478,
      "totalEval": 481695178,
      "totalProfit": 85132241,
      "returnRate": 21.47,
      "items": [
        { "account": "7075******-01 [종합(비대면)]", "name": "TIGER 미국우주테크", "qty": 28.0, "price": 7335.0, "buy": 248125, "eval": 205380, "profit": -42745, "returnRate": -17.23 },
        { "account": "7075******-01 [종합(비대면)]", "name": "USD(외화예수금)", "qty": 0.04, "price": 1338.2, "buy": 0, "eval": 53, "profit": 0, "returnRate": 0.0 },
        { "account": "7075******-01 [종합(비대면)]", "name": "현금잔고(예수금)", "qty": 0.0, "price": 0.0, "buy": 0, "eval": 84623, "profit": 0, "returnRate": 0.0 },
        { "account": "7075******-29 [퇴직연금(IRP)]", "name": "현금잔고(예수금)", "qty": 0.0, "price": 0.0, "buy": 0, "eval": 135, "profit": 0, "returnRate": 0.0 },
        { "account": "7075******-29 [퇴직연금(IRP)]", "name": "TIGER 미국나스닥100", "qty": 47.0, "price": 174005.0, "buy": 3479305, "eval": 8178235, "profit": 4698930, "returnRate": 135.05 },
        { "account": "7075******-29 [퇴직연금(IRP)]", "name": "ACE 베트남VN30(합성)", "qty": 65.0, "price": 28200.0, "buy": 1687480, "eval": 1833000, "profit": 145520, "returnRate": 8.62 },
        { "account": "7075******-29 [퇴직연금(IRP)]", "name": "TIGER 리츠부동산인프라", "qty": 5.0, "price": 4040.0, "buy": 20200, "eval": 20200, "profit": 0, "returnRate": 0.0 },
        { "account": "7075******-29 [퇴직연금(IRP)]", "name": "ACE KRX금현물", "qty": 296.0, "price": 26490.0, "buy": 3384500, "eval": 7841040, "profit": 4456540, "returnRate": 131.67 },
        { "account": "7075******-29 [퇴직연금(IRP)]", "name": "SOL 미국배당다우존스", "qty": 270.0, "price": 13290.0, "buy": 2623765, "eval": 3588300, "profit": 964535, "returnRate": 36.76 },
        { "account": "7075******-29 [퇴직연금(IRP)]", "name": "TIGER TDF2045 적격", "qty": 146.0, "price": 11710.0, "buy": 1702855, "eval": 1709660, "profit": 6805, "returnRate": 0.4 },
        { "account": "7075******-29 [퇴직연금(IRP)]", "name": "피델리티글로벌금융주(주식-재간접)-CP-e", "qty": 826333.0, "price": 2178.0, "buy": 1232746, "eval": 1799618, "profit": 566872, "returnRate": 45.98 },
        { "account": "7075******-29 [퇴직연금(IRP)]", "name": "iM에셋공모주플러스증권투자1(채혼)-C-Pe", "qty": 2366101.0, "price": 1211.0, "buy": 2488390, "eval": 2865036, "profit": 376646, "returnRate": 15.14 },
        { "account": "7075******-29 [퇴직연금(IRP)]", "name": "미래전략배분적격TDF2045혼합자산자-C-P2e", "qty": 2776680.0, "price": 2095.0, "buy": 4064618, "eval": 5817079, "profit": 1752461, "returnRate": 43.12 },
        { "account": "7075******-29 [퇴직연금(IRP)]", "name": "현금성자산(삼성증권)", "qty": 0.0, "price": 0.0, "buy": 1861602, "eval": 1852769, "profit": -8833, "returnRate": -0.47 },
        { "account": "7075******-29 [퇴직연금(IRP)]", "name": "예수금합계(삼성증권)", "qty": 52216.0, "price": 0.0, "buy": 52216, "eval": 52216, "profit": 0, "returnRate": 0.0 },
        { "account": "7126******-15 [연금저축 CMA(비대면)(회사지원)]", "name": "삼성신종종류형MMF제4호-CP", "qty": 938045.0, "price": 1017.0, "buy": 952593, "eval": 953729, "profit": 1136, "returnRate": 0.12 },
        { "account": "7126******-15 [연금저축 CMA(비대면)(회사지원)]", "name": "미래전략배분TDF2040혼합자산자-C-Pe", "qty": 6805348.0, "price": 2192.0, "buy": 11500000, "eval": 14914260, "profit": 3414260, "returnRate": 29.69 },
        { "account": "7126******-15 [연금저축 CMA(비대면)(회사지원)]", "name": "KB온국민TDF2045(주식혼합-재간접)(H)-C-Pe", "qty": 5603701.0, "price": 1933.0, "buy": 7900000, "eval": 10830609, "profit": 2930609, "returnRate": 37.1 },
        { "account": "7126******-15 [연금저축 CMA(비대면)(회사지원)]", "name": "한화LIFEPLUS자산배분TDF2045(주식혼합-재간접)-C-Pe", "qty": 5027059.0, "price": 2194.0, "buy": 7900000, "eval": 11030423, "profit": 3130423, "returnRate": 39.63 },
        { "account": "7126******-15 [연금저축 CMA(비대면)(회사지원)]", "name": "KODEX 반도체", "qty": 22.0, "price": 128900.0, "buy": 2299030, "eval": 2835800, "profit": 536770, "returnRate": 23.35 },
        { "account": "7126******-15 [연금저축 CMA(비대면)(회사지원)]", "name": "TIGER 미국나스닥100", "qty": 189.0, "price": 174005.0, "buy": 16804870, "eval": 32886945, "profit": 16082075, "returnRate": 95.7 },
        { "account": "7126******-15 [연금저축 CMA(비대면)(회사지원)]", "name": "KODEX 은선물(H)", "qty": 895.0, "price": 10365.0, "buy": 5540890, "eval": 9276675, "profit": 3735785, "returnRate": 67.42 },
        { "account": "7126******-15 [연금저축 CMA(비대면)(회사지원)]", "name": "TIGER 미국S&P500", "qty": 1100.0, "price": 25440.0, "buy": 15417500, "eval": 27984000, "profit": 12566500, "returnRate": 81.51 },
        { "account": "7126******-15 [연금저축 CMA(비대면)(회사지원)]", "name": "KODEX 미국S&P500TR", "qty": 188.0, "price": 23130.0, "buy": 3766435, "eval": 4348440, "profit": 582005, "returnRate": 15.45 },
        { "account": "7126******-15 [연금저축 CMA(비대면)(회사지원)]", "name": "ACE KRX금현물", "qty": 1199.0, "price": 26490.0, "buy": 18285305, "eval": 31761510, "profit": 13476205, "returnRate": 73.7 },
        { "account": "7126******-15 [연금저축 CMA(비대면)(회사지원)]", "name": "KODEX 미국커버드콜액티브", "qty": 601.0, "price": 12275.0, "buy": 7731295, "eval": 7377275, "profit": -354020, "returnRate": -4.58 },
        { "account": "7126******-15 [연금저축 CMA(비대면)(회사지원)]", "name": "KODEX 인도Nifty50", "qty": 686.0, "price": 10990.0, "buy": 8888772, "eval": 7539140, "profit": -1349632, "returnRate": -15.18 },
        { "account": "7126******-15 [연금저축 CMA(비대면)(회사지원)]", "name": "KODEX iShares미국인플레이션국채액티브", "qty": 600.0, "price": 10315.0, "buy": 6064500, "eval": 6189000, "profit": 124500, "returnRate": 2.05 },
        { "account": "7126******-15 [연금저축 CMA(비대면)(회사지원)]", "name": "KODEX iShares미국하이일드액티브", "qty": 577.0, "price": 10555.0, "buy": 5941715, "eval": 6090235, "profit": 148520, "returnRate": 2.5 },
        { "account": "7126******-15 [연금저축 CMA(비대면)(회사지원)]", "name": "KODEX iShares미국투자등급회사채액티브", "qty": 590.0, "price": 10425.0, "buy": 6305600, "eval": 6150750, "profit": -154850, "returnRate": -2.46 },
        { "account": "7126******-15 [연금저축 CMA(비대면)(회사지원)]", "name": "KODEX 200타겟위클리커버드콜", "qty": 61.0, "price": 20760.0, "buy": 689605, "eval": 1266360, "profit": 576755, "returnRate": 83.64 },
        { "account": "7126******-15 [연금저축 CMA(비대면)(회사지원)]", "name": "KoAct 코리아액티브", "qty": 177.0, "price": 9060.0, "buy": 2415650, "eval": 1603620, "profit": -812030, "returnRate": -33.62 },
        { "account": "7126******-15 [연금저축 CMA(비대면)(회사지원)]", "name": "TIGER 미국우주테크", "qty": 237.0, "price": 7335.0, "buy": 3230195, "eval": 1738395, "profit": -1491800, "returnRate": -46.18 },
        { "account": "7126******-15 [연금저축 CMA(비대면)(회사지원)]", "name": "예수금(원화)", "qty": 0.0, "price": 0.0, "buy": 0, "eval": 7, "profit": 0, "returnRate": 0.0 },
        { "account": "7162******-01 [종합(주식보상S)(비대면)]", "name": "삼성전자", "qty": 58.0, "price": 262000.0, "buy": 9309000, "eval": 15196000, "profit": 5887000, "returnRate": 63.24 },
        { "account": "7162******-01 [종합(주식보상S)(비대면)]", "name": "삼성전자", "qty": 22.0, "price": 262000.0, "buy": 6105000, "eval": 5764000, "profit": -341000, "returnRate": -5.59 },
        { "account": "7162******-01 [종합(주식보상S)(비대면)]", "name": "예수금(원화)", "qty": 0.0, "price": 0.0, "buy": 0, "eval": 36641, "profit": 0, "returnRate": 0.0 },
        { "account": "7164******-28 [퇴직연금(DC)]", "name": "ACE 베트남VN30(합성)", "qty": 288.0, "price": 28200.0, "buy": 7825220, "eval": 8121600, "profit": 296380, "returnRate": 3.79 },
        { "account": "7164******-28 [퇴직연금(DC)]", "name": "KODEX 200TR", "qty": 386.0, "price": 39640.0, "buy": 6494650, "eval": 15301040, "profit": 8806390, "returnRate": 135.59 },
        { "account": "7164******-28 [퇴직연금(DC)]", "name": "TIGER 미국S&P500", "qty": 285.0, "price": 25440.0, "buy": 6649595, "eval": 7250400, "profit": 600805, "returnRate": 9.04 },
        { "account": "7164******-28 [퇴직연금(DC)]", "name": "KODEX 미국나스닥100", "qty": 307.0, "price": 26015.0, "buy": 7060390, "eval": 7986605, "profit": 926215, "returnRate": 13.12 },
        { "account": "7164******-28 [퇴직연금(DC)]", "name": "KODEX TDF2050액티브 적격", "qty": 3311.0, "price": 16400.0, "buy": 52283910, "eval": 54300400, "profit": 2016490, "returnRate": 3.86 },
        { "account": "7164******-28 [퇴직연금(DC)]", "name": "KODEX 로봇액티브", "qty": 110.0, "price": 31120.0, "buy": 2240700, "eval": 3423200, "profit": 1182500, "returnRate": 52.77 },
        { "account": "7164******-28 [퇴직연금(DC)]", "name": "KODEX 인도Nifty50", "qty": 748.0, "price": 10990.0, "buy": 10184960, "eval": 8220520, "profit": -1964440, "returnRate": -19.29 },
        { "account": "7164******-28 [퇴직연금(DC)]", "name": "TIGER 미국다우존스", "qty": 791.0, "price": 14500.0, "buy": 9752270, "eval": 11469500, "profit": 1717230, "returnRate": 17.61 },
        { "account": "7164******-28 [퇴직연금(DC)]", "name": "SOL 반도체TOP3플러스", "qty": 146.0, "price": 28700.0, "buy": 4710220, "eval": 4190200, "profit": -520020, "returnRate": -11.04 },
        { "account": "7164******-28 [퇴직연금(DC)]", "name": "KODEX iShares미국하이일드액티브", "qty": 453.0, "price": 10555.0, "buy": 5136682, "eval": 4781415, "profit": -355267, "returnRate": -6.92 },
        { "account": "7164******-28 [퇴직연금(DC)]", "name": "KODEX 국채선물10년액티브", "qty": 53.0, "price": 102515.0, "buy": 5985675, "eval": 5433295, "profit": -552380, "returnRate": -9.23 },
        { "account": "7164******-28 [퇴직연금(DC)]", "name": "KODEX 미국빅테크10", "qty": 310.0, "price": 22800.0, "buy": 6687470, "eval": 7068000, "profit": 380530, "returnRate": 5.69 },
        { "account": "7164******-28 [퇴직연금(DC)]", "name": "KODEX 미국AI전력핵심인프라", "qty": 374.0, "price": 18910.0, "buy": 5978405, "eval": 7072340, "profit": 1093935, "returnRate": 18.3 },
        { "account": "7164******-28 [퇴직연금(DC)]", "name": "KODEX 금융고배당TOP10타겟위클리커버드콜", "qty": 738.0, "price": 12030.0, "buy": 9222005, "eval": 8878140, "profit": -343865, "returnRate": -3.73 },
        { "account": "7164******-28 [퇴직연금(DC)]", "name": "KODEX 미국달러비상장채권액티브", "qty": 216.0, "price": 14565.0, "buy": 3260430, "eval": 3146040, "profit": -114390, "returnRate": -3.51 },
        { "account": "7164******-28 [퇴직연금(DC)]", "name": "TIGER 머니마켓액티브", "qty": 116.0, "price": 103635.0, "buy": 11731039, "eval": 12021660, "profit": 290621, "returnRate": 2.48 },
        { "account": "7164******-28 [퇴직연금(DC)]", "name": "TIGER 차이나테크TOP10", "qty": 542.0, "price": 12235.0, "buy": 6861485, "eval": 6631370, "profit": -230115, "returnRate": -3.35 },
        { "account": "7164******-28 [퇴직연금(DC)]", "name": "KODEX 차이나달러비상장채권액티브", "qty": 386.0, "price": 7755.0, "buy": 4451400, "eval": 2993430, "profit": -1457970, "returnRate": -32.75 },
        { "account": "7164******-28 [퇴직연금(DC)]", "name": "KODEX 금양액티브", "qty": 964.0, "price": 12290.0, "buy": 12324550, "eval": 11847560, "profit": -476990, "returnRate": -3.87 },
        { "account": "7164******-28 [퇴직연금(DC)]", "name": "TIGER KRX금현물", "qty": 2726.0, "price": 12605.0, "buy": 28037200, "eval": 34361230, "profit": 6324030, "returnRate": 22.56 },
        { "account": "7164******-28 [퇴직연금(DC)]", "name": "KODEX 금융고배당TOP10", "qty": 219.0, "price": 13815.0, "buy": 2818075, "eval": 3025485, "profit": 207410, "returnRate": 7.36 },
        { "account": "7164******-28 [퇴직연금(DC)]", "name": "KODEX 원자력SMR", "qty": 200.0, "price": 17915.0, "buy": 2042000, "eval": 3583000, "profit": 1541000, "returnRate": 75.47 },
        { "account": "7164******-28 [퇴직연금(DC)]", "name": "TIGER 미국우주테크", "qty": 1093.0, "price": 7335.0, "buy": 13858955, "eval": 8017155, "profit": -5841800, "returnRate": -42.15 },
        { "account": "7164******-28 [퇴직연금(DC)]", "name": "현금성자산(삼성증권)", "qty": 950435.0, "price": 0.0, "buy": 950435, "eval": 950435, "profit": 0, "returnRate": 0.0 }
      ]
    }
  ];

  let rawDatasets = [];
  let selectedSnapshotIndex = 1;
  let selectedAccountFilter = "ALL";
  let activeTabId = "tab-overview";

  let lineChartInstance = null;
  let pieChartInstance = null;
  let accountBarChartInstance = null;
  let accountRowChartInstances = [];

  function formatKRW(val) {
    return new Intl.NumberFormat('ko-KR').format(Math.round(val)) + '원';
  }

  function formatPercent(val) {
    const sign = val > 0 ? '+' : '';
    return `${sign}${val.toFixed(2)}%`;
  }

  async function initData() {
    try {
      const resp = await fetch('initial_data.json');
      if (resp.ok) {
        rawDatasets = await resp.json();
      } else {
        rawDatasets = INITIAL_DATA;
      }
    } catch(e) {
      rawDatasets = INITIAL_DATA;
    }

    const savedCustom = localStorage.getItem('js_investment_custom');
    if (savedCustom) {
      try {
        const parsed = JSON.parse(savedCustom);
        rawDatasets = rawDatasets.concat(parsed);
      } catch(e) {}
    }

    rawDatasets.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Normalize totals for all snapshots
    rawDatasets.forEach(ds => {
      if (ds.items && ds.items.length > 0) {
        ds.totalBuy = ds.items.reduce((sum, it) => sum + (it.buy || 0), 0);
        ds.totalEval = ds.items.reduce((sum, it) => sum + (it.eval || 0), 0);
        ds.totalProfit = ds.items.reduce((sum, it) => sum + (it.profit || 0), 0);
        ds.returnRate = ds.totalBuy > 0 ? (ds.totalProfit / ds.totalBuy * 100) : 0;
      }
    });

    selectedSnapshotIndex = rawDatasets.length - 1;

    renderDateButtons();
    renderDashboard();
  }

  function renderDateButtons() {
    const group = document.getElementById('dateSelectorGroup');
    if (!group) return;
    group.innerHTML = '';

    rawDatasets.forEach((ds, idx) => {
      const btn = document.createElement('button');
      btn.className = `date-btn ${idx === selectedSnapshotIndex ? 'active' : ''}`;
      btn.innerText = ds.date || `Snap #${idx+1}`;
      btn.addEventListener('click', () => {
        selectedSnapshotIndex = idx;
        renderDateButtons();
        renderDashboard();
      });
      group.appendChild(btn);
    });

    const latestDs = rawDatasets[rawDatasets.length - 1];
    if (latestDs) {
      const headerTextEl = document.getElementById('headerActiveDateText');
      if (headerTextEl) headerTextEl.innerText = `${latestDs.date} (최신)`;
    }
  }

  function switchTab(tabId) {
    activeTabId = tabId;
    document.querySelectorAll('.nav-tab').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.toggle('active', content.id === tabId);
    });

    if (tabId === 'tab-overview') {
      if (lineChartInstance) lineChartInstance.resize();
      if (pieChartInstance) pieChartInstance.resize();
      accountRowChartInstances.forEach(c => c && c.resize());
    } else if (tabId === 'tab-accounts') {
      renderAccountBarChart();
    } else if (tabId === 'tab-snapshots') {
      renderSnapshotsHistoryTable();
    } else if (tabId === 'tab-holdings') {
      renderStockTable();
    }
  }
  window.switchTab = switchTab;

  function renderDashboard() {
    const latestIndex = rawDatasets.length - 1;
    const latestCurr = rawDatasets[latestIndex];
    const prevLatest = latestIndex > 0 ? rawDatasets[latestIndex - 1] : null;

    if (latestCurr) {
      let totalBuy = 0, totalEval = 0, totalProfit = 0;
      let accountMap = {};
      let items = latestCurr.items || [];

      if (items.length > 0) {
        items.forEach(it => {
          totalBuy += it.buy;
          totalEval += it.eval;
          totalProfit += it.profit;

          if (!accountMap[it.account]) {
            accountMap[it.account] = { name: it.account, buy: 0, eval: 0, profit: 0, count: 0 };
          }
          accountMap[it.account].buy += it.buy;
          accountMap[it.account].eval += it.eval;
          accountMap[it.account].profit += it.profit;
          accountMap[it.account].count += 1;
        });
      } else {
        totalBuy = latestCurr.totalBuy;
        totalEval = latestCurr.totalEval;
        totalProfit = latestCurr.totalProfit;
        accountMap = latestCurr.accounts;
      }

      const returnRate = totalBuy > 0 ? (totalProfit / totalBuy * 100) : 0;

      document.getElementById('kpiTotalEval').innerText = formatKRW(totalEval);
      document.getElementById('kpiTotalBuy').innerText = formatKRW(totalBuy);
      
      const profitEl = document.getElementById('kpiTotalProfit');
      profitEl.innerText = formatKRW(totalProfit);
      if (totalProfit >= 0) {
        profitEl.style.color = 'var(--profit-green)';
        document.getElementById('kpiProfitBadge').className = 'badge-trend up';
        document.getElementById('kpiProfitBadge').innerText = `수익 ${formatKRW(totalProfit)}`;
      } else {
        profitEl.style.color = 'var(--loss-red)';
        document.getElementById('kpiProfitBadge').className = 'badge-trend down';
        document.getElementById('kpiProfitBadge').innerText = `손실 ${formatKRW(totalProfit)}`;
      }

      document.getElementById('kpiReturnRate').innerText = formatPercent(returnRate);

      if (prevLatest) {
        const prevEval = prevLatest.totalEval || (prevLatest.items ? prevLatest.items.reduce((a,b)=>a+b.eval,0) : 0);
        const evalDiff = totalEval - prevEval;
        const evalDiffPct = prevEval > 0 ? (evalDiff / prevEval * 100) : 0;
        const trendEl = document.getElementById('kpiEvalTrend');
        if (evalDiff >= 0) {
          trendEl.className = 'badge-trend up';
          trendEl.innerText = `전월 대비 +${formatKRW(evalDiff)} (+${evalDiffPct.toFixed(1)}%)`;
        } else {
          trendEl.className = 'badge-trend down';
          trendEl.innerText = `전월 대비 ${formatKRW(evalDiff)} (${evalDiffPct.toFixed(1)}%)`;
        }
      } else {
        document.getElementById('kpiEvalTrend').innerText = '최초 스냅샷';
        document.getElementById('kpiEvalTrend').className = 'badge-trend up';
      }

      renderLineChart();
      renderPieChart(accountMap);
      renderAccountRowList(accountMap);
      renderAccountCards(accountMap, 'accountsGridTab3');
      populateAccountFilter(accountMap);
    }

    renderStockTable();
    renderSnapshotsHistoryTable();

    if (activeTabId === 'tab-accounts') {
      renderAccountBarChart();
    }
  }

  function renderLineChart() {
    const ctx = document.getElementById('trendLineChart').getContext('2d');
    if (lineChartInstance) lineChartInstance.destroy();

    const labels = rawDatasets.map(d => d.date);
    const evalData = rawDatasets.map(d => d.totalEval || (d.items ? d.items.reduce((a,b)=>a+b.eval,0) : 0));
    const buyData = rawDatasets.map(d => d.totalBuy || (d.items ? d.items.reduce((a,b)=>a+b.buy,0) : 0));
    const profitData = rawDatasets.map(d => d.totalProfit || (d.items ? d.items.reduce((a,b)=>a+b.profit,0) : 0));

    lineChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: '총 평가금액',
            data: evalData,
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99, 102, 241, 0.15)',
            borderWidth: 3,
            fill: true,
            tension: 0.3,
            pointRadius: 6
          },
          {
            label: '총 매수금액',
            data: buyData,
            borderColor: '#9ca3af',
            borderDash: [5, 5],
            borderWidth: 2,
            fill: false,
            tension: 0.3,
            pointRadius: 4
          },
          {
            label: '평가손익',
            data: profitData,
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            borderWidth: 2,
            fill: false,
            tension: 0.3,
            pointRadius: 5
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          datalabels: { display: false },
          legend: { labels: { color: '#9ca3af', font: { family: 'Outfit', size: 12 } } },
          tooltip: {
            callbacks: {
              label: (context) => context.dataset.label + ': ' + formatKRW(context.raw)
            }
          }
        },
        scales: {
          x: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#9ca3af' } },
          y: {
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: {
              color: '#9ca3af',
              callback: (val) => (val / 100000000).toFixed(1) + '억원'
            }
          }
        }
      }
    });
  }

  function renderPieChart(accountMap) {
    const ctx = document.getElementById('accountPieChart').getContext('2d');
    if (pieChartInstance) pieChartInstance.destroy();

    const labels = Object.keys(accountMap).map(k => k.split(' ')[1] || k.split(' ')[0]);
    const data = Object.values(accountMap).map(v => v.eval);
    const totalSum = data.reduce((a, b) => a + b, 0);

    const colors = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];

    pieChartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: colors.slice(0, labels.length),
          borderColor: '#111827',
          borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { color: '#9ca3af', font: { family: 'Outfit', size: 11 } } },
          tooltip: {
            callbacks: {
              label: (context) => {
                const val = context.raw;
                const pct = totalSum > 0 ? (val / totalSum * 100).toFixed(1) : 0;
                return `${context.label}: ${formatKRW(val)} (${pct}%)`;
              }
            }
          },
          datalabels: {
            display: true,
            color: '#ffffff',
            textAlign: 'center',
            font: {
              family: 'Outfit',
              weight: 'bold',
              size: 12
            },
            formatter: (value) => {
              if (totalSum <= 0) return '';
              const pct = (value / totalSum * 100);
              if (pct < 1.0) return '';
              
              const eok = (value / 100000000).toFixed(1);
              return [`${pct.toFixed(1)}%`, `(${eok}억)`];
            },
            textShadowColor: 'rgba(0, 0, 0, 0.8)',
            textShadowBlur: 5
          }
        }
      }
    });
  }

  function renderAccountRowList(accountMap) {
    const container = document.getElementById('accountsRowList');
    if (!container) return;

    accountRowChartInstances.forEach(c => c && c.destroy());
    accountRowChartInstances = [];

    container.innerHTML = '';

    const dates = rawDatasets.map(d => d.date);

    Object.entries(accountMap).forEach(([acctKey, acctVal], index) => {
      const card = document.createElement('div');
      card.className = 'account-row-card';

      const profitRate = acctVal.buy > 0 ? (acctVal.profit / acctVal.buy * 100) : 0;
      const isProfit = acctVal.profit >= 0;
      const profitColor = isProfit ? 'var(--profit-green)' : 'var(--loss-red)';

      const canvasId = `acctRowCanvas_${index}`;

      card.innerHTML = `
        <div class="account-row-info">
          <div class="account-row-name">${acctKey}</div>
          <div class="account-row-eval">${formatKRW(acctVal.eval)}</div>
          <div class="account-row-sub">
            <span>매수: ${formatKRW(acctVal.buy)}</span>
            <span style="color: ${profitColor}; font-weight: 700;">
              ${formatKRW(acctVal.profit)} (${formatPercent(profitRate)})
            </span>
          </div>
          <button class="btn-view-holdings" onclick="window.viewAccountHoldings('${acctKey.replace(/'/g, "\\'")}')">
            종목 상세보기 →
          </button>
        </div>

        <div class="account-row-chart">
          <canvas id="${canvasId}"></canvas>
        </div>
      `;

      container.appendChild(card);

      const acctHistory = rawDatasets.map(ds => {
        if (ds.items && ds.items.length > 0) {
          return ds.items.filter(it => it.account === acctKey).reduce((sum, item) => sum + item.eval, 0);
        } else if (ds.accounts && ds.accounts[acctKey]) {
          return ds.accounts[acctKey].eval;
        }
        return 0;
      });

      const ctx = document.getElementById(canvasId).getContext('2d');
      const rowChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: dates,
          datasets: [{
            label: `${acctKey} 평가금액`,
            data: acctHistory,
            borderColor: isProfit ? '#10b981' : '#6366f1',
            backgroundColor: isProfit ? 'rgba(16, 185, 129, 0.12)' : 'rgba(99, 102, 241, 0.12)',
            borderWidth: 2.5,
            fill: true,
            tension: 0.3,
            pointRadius: 5
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            datalabels: { display: false },
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => '평가액: ' + formatKRW(ctx.raw)
              }
            }
          },
          scales: {
            x: { grid: { color: 'rgba(255, 255, 255, 0.04)' }, ticks: { color: '#9ca3af', font: { size: 11 } } },
            y: { grid: { color: 'rgba(255, 255, 255, 0.04)' }, ticks: { color: '#9ca3af', font: { size: 10 }, callback: (v) => (v/10000000).toFixed(1) + '천만' } }
          }
        }
      });

      accountRowChartInstances.push(rowChart);
    });
  }

  window.viewAccountHoldings = function(acctKey) {
    selectedAccountFilter = acctKey;
    const filterSel = document.getElementById('accountFilterSelect');
    if (filterSel) filterSel.value = selectedAccountFilter;
    switchTab('tab-holdings');
    renderStockTable();
  };

  function renderAccountBarChart() {
    const ctx = document.getElementById('accountBarChart');
    if (!ctx) return;
    if (accountBarChartInstance) accountBarChartInstance.destroy();

    const latestIndex = rawDatasets.length - 1;
    const curr = rawDatasets[latestIndex];
    if (!curr) return;

    let accountMap = curr.accounts || {};
    if (curr.items && curr.items.length > 0) {
      accountMap = {};
      curr.items.forEach(it => {
        if (!accountMap[it.account]) accountMap[it.account] = { buy: 0, eval: 0, profit: 0 };
        accountMap[it.account].buy += it.buy;
        accountMap[it.account].eval += it.eval;
        accountMap[it.account].profit += it.profit;
      });
    }

    const labels = Object.keys(accountMap).map(k => k.split(' ')[1] || k.split(' ')[0]);
    const buyData = Object.values(accountMap).map(v => v.buy);
    const evalData = Object.values(accountMap).map(v => v.eval);
    const profitData = Object.values(accountMap).map(v => v.profit);

    accountBarChartInstance = new Chart(ctx.getContext('2d'), {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          { label: '매수금액', data: buyData, backgroundColor: 'rgba(156, 163, 175, 0.6)', borderRadius: 6 },
          { label: '평가금액', data: evalData, backgroundColor: 'rgba(99, 102, 241, 0.8)', borderRadius: 6 },
          { label: '평가손익', data: profitData, backgroundColor: 'rgba(16, 185, 129, 0.8)', borderRadius: 6 }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          datalabels: { display: false },
          legend: { labels: { color: '#9ca3af', font: { family: 'Outfit', size: 12 } } },
          tooltip: { callbacks: { label: (ctx) => ctx.dataset.label + ': ' + formatKRW(ctx.raw) } }
        },
        scales: {
          x: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#9ca3af' } },
          y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#9ca3af', callback: (v) => (v/10000000).toFixed(0) + '천만' } }
        }
      }
    });
  }

  function renderAccountCards(accountMap, containerId) {
    const grid = document.getElementById(containerId);
    if (!grid) return;
    grid.innerHTML = '';

    Object.entries(accountMap).forEach(([acctKey, acctVal]) => {
      const card = document.createElement('div');
      card.className = `account-card ${selectedAccountFilter === acctKey ? 'active-account' : ''}`;
      
      const profitRate = acctVal.buy > 0 ? (acctVal.profit / acctVal.buy * 100) : 0;
      const isProfit = acctVal.profit >= 0;

      card.innerHTML = `
        <div class="account-name">${acctKey}</div>
        <div class="account-eval">${formatKRW(acctVal.eval)}</div>
        <div class="account-details">
          <span>매수: ${formatKRW(acctVal.buy)}</span>
          <span style="color: ${isProfit ? 'var(--profit-green)' : 'var(--loss-red)'}; font-weight: 700;">
            ${formatKRW(acctVal.profit)} (${formatPercent(profitRate)})
          </span>
        </div>
      `;

      card.addEventListener('click', () => {
        selectedAccountFilter = acctKey;
        const filterSel = document.getElementById('accountFilterSelect');
        if (filterSel) filterSel.value = selectedAccountFilter;
        switchTab('tab-holdings');
        renderStockTable();
      });

      grid.appendChild(card);
    });
  }

  function populateAccountFilter(accountMap) {
    const sel = document.getElementById('accountFilterSelect');
    if (!sel) return;
    sel.innerHTML = '<option value="ALL">전체 계좌 보기</option>';

    const availableAccounts = new Set(Object.keys(accountMap || {}));
    const curr = rawDatasets[selectedSnapshotIndex] || rawDatasets[rawDatasets.length - 1];
    if (curr && curr.items) {
      curr.items.forEach(it => availableAccounts.add(it.account));
    }

    Array.from(availableAccounts).forEach(acctKey => {
      const opt = document.createElement('option');
      opt.value = acctKey;
      opt.innerText = acctKey;
      if (acctKey === selectedAccountFilter) opt.selected = true;
      sel.appendChild(opt);
    });
  }

  window.resetHoldingsFilter = function() {
    selectedAccountFilter = "ALL";
    const acctSel = document.getElementById('accountFilterSelect');
    if (acctSel) acctSel.value = "ALL";
    const searchInp = document.getElementById('searchInput');
    if (searchInp) searchInp.value = "";
    const sortSel = document.getElementById('sortBySelect');
    if (sortSel) sortSel.value = "account-asc";
    renderStockTable();
  };

  function renderStockTable() {
    const curr = rawDatasets[selectedSnapshotIndex] || rawDatasets[rawDatasets.length - 1];
    if (!curr || !curr.items) return;

    let items = [...curr.items];

    if (selectedAccountFilter !== "ALL") {
      items = items.filter(it => it.account === selectedAccountFilter);
    }

    const searchInput = document.getElementById('searchInput');
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    if (query) {
      items = items.filter(it => it.name.toLowerCase().includes(query) || it.account.toLowerCase().includes(query));
    }

    const sortBySel = document.getElementById('sortBySelect');
    const sortBy = sortBySel ? sortBySel.value : 'account-asc';

    if (sortBy === 'account-asc') {
      const accountOrderMap = {};
      let idx = 0;
      curr.items.forEach(it => {
        if (!(it.account in accountOrderMap)) {
          accountOrderMap[it.account] = idx++;
        }
      });
      items.sort((a, b) => {
        const orderA = accountOrderMap[a.account] ?? 999;
        const orderB = accountOrderMap[b.account] ?? 999;
        if (orderA !== orderB) return orderA - orderB;
        return b.eval - a.eval;
      });
    } else if (sortBy === 'eval-desc') items.sort((a, b) => b.eval - a.eval);
    else if (sortBy === 'profit-desc') items.sort((a, b) => b.profit - a.profit);
    else if (sortBy === 'profit-asc') items.sort((a, b) => a.profit - b.profit);
    else if (sortBy === 'return-desc') items.sort((a, b) => b.returnRate - a.returnRate);

    const countEl = document.getElementById('holdingsCount');
    if (countEl) countEl.innerText = `${items.length}개`;

    const totalEvalInHoldings = items.reduce((sum, item) => sum + item.eval, 0);
    const totalEvalEl = document.getElementById('holdingsTotalEval');
    if (totalEvalEl) totalEvalEl.innerText = formatKRW(totalEvalInHoldings);

    const gainItemEl = document.getElementById('topGainItem');
    const gainValEl = document.getElementById('topGainValue');
    const lossItemEl = document.getElementById('topLossItem');
    const lossValEl = document.getElementById('topLossValue');

    if (items.length > 0) {
      const topGain = [...items].sort((a,b) => b.profit - a.profit)[0];
      const topLoss = [...items].sort((a,b) => a.profit - b.profit)[0];

      if (gainItemEl) gainItemEl.innerText = topGain ? topGain.name : '-';
      if (gainValEl) gainValEl.innerText = topGain ? `${formatKRW(topGain.profit)} (${formatPercent(topGain.returnRate)})` : '-';

      if (lossItemEl) lossItemEl.innerText = topLoss ? topLoss.name : '-';
      if (lossValEl) lossValEl.innerText = topLoss ? `${formatKRW(topLoss.profit)} (${formatPercent(topLoss.returnRate)})` : '-';
    } else {
      if (gainItemEl) gainItemEl.innerText = '-';
      if (gainValEl) gainValEl.innerText = '-';
      if (lossItemEl) lossItemEl.innerText = '-';
      if (lossValEl) lossValEl.innerText = '-';
    }

    const tbody = document.getElementById('stockTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    if (items.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align: center; color: var(--text-muted); padding: 36px 20px;">
            <div style="font-size: 15px; font-weight: 600; margin-bottom: 10px; color: var(--text-main);">검색 또는 계좌 필터 조건에 해당하는 보유 종목이 없습니다.</div>
            <button class="btn-select-snap" onclick="window.resetHoldingsFilter()" style="padding: 8px 16px;">
              <i data-lucide="rotate-ccw"></i> 전체 계좌 / 필터 초기화
            </button>
          </td>
        </tr>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    items.forEach(it => {
      const tr = document.createElement('tr');
      const isProfit = it.profit >= 0;
      const profitClass = isProfit ? 'text-profit' : 'text-loss';

      tr.innerHTML = `
        <td style="font-size: 13px; color: var(--text-muted);">${it.account}</td>
        <td style="font-weight: 700; color: #fff;">${it.name}</td>
        <td class="num-col">${it.qty.toLocaleString()}</td>
        <td class="num-col">${it.price.toLocaleString()}원</td>
        <td class="num-col">${it.buy.toLocaleString()}원</td>
        <td class="num-col" style="font-weight: 700;">${it.eval.toLocaleString()}원</td>
        <td class="num-col ${profitClass}">${isProfit ? '+' : ''}${it.profit.toLocaleString()}원</td>
        <td class="num-col ${profitClass}">${formatPercent(it.returnRate)}</td>
      `;

      tbody.appendChild(tr);
    });
  }

  function renderSnapshotsHistoryTable() {
    const tbody = document.getElementById('snapshotsHistoryTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';

    const latestIndex = rawDatasets.length - 1;

    rawDatasets.forEach((ds, idx) => {
      const tr = document.createElement('tr');
      const isLatest = idx === latestIndex;
      const isSelected = idx === selectedSnapshotIndex;
      const isProfit = ds.totalProfit >= 0;
      const profitClass = isProfit ? 'text-profit' : 'text-loss';

      tr.innerHTML = `
        <td style="font-weight: 700; color: #fff;">
          ${ds.date} ${isLatest ? '<span style="color: var(--primary); font-size: 11px; font-weight: 800;">[최신]</span>' : ''}
        </td>
        <td style="font-size: 13px; color: var(--text-muted);">${ds.timestamp || ds.label}</td>
        <td class="num-col">${formatKRW(ds.totalBuy)}</td>
        <td class="num-col" style="font-weight: 700;">${formatKRW(ds.totalEval)}</td>
        <td class="num-col ${profitClass}">${isProfit ? '+' : ''}${formatKRW(ds.totalProfit)}</td>
        <td class="num-col ${profitClass}">${formatPercent(ds.returnRate)}</td>
        <td style="text-align: center;">
          ${isSelected ? 
            `<span class="badge-active-snap">종목 조회 선택됨</span>` : 
            `<button class="btn-select-snap" onclick="window.selectSnapshotIndex(${idx})">스냅샷 조회</button>`
          }
        </td>
      `;

      tbody.appendChild(tr);
    });
  }

  window.selectSnapshotIndex = function(idx) {
    selectedSnapshotIndex = idx;
    renderDateButtons();
    renderDashboard();
    switchTab('tab-holdings');
  };

  function setupEvents() {
    document.querySelectorAll('.nav-tab').forEach(tabBtn => {
      tabBtn.addEventListener('click', () => {
        switchTab(tabBtn.dataset.tab);
      });
    });

    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.addEventListener('input', renderStockTable);

    const acctFilter = document.getElementById('accountFilterSelect');
    if (acctFilter) {
      acctFilter.addEventListener('change', (e) => {
        selectedAccountFilter = e.target.value;
        renderStockTable();
      });
    }

    const sortSel = document.getElementById('sortBySelect');
    if (sortSel) sortSel.addEventListener('change', renderStockTable);

    const modal = document.getElementById('uploadModal');
    const openModalBtn = document.getElementById('openUploadModalBtn');
    if (openModalBtn) openModalBtn.addEventListener('click', () => modal.classList.add('active'));
    
    const closeModalBtn = document.getElementById('closeUploadModalBtn');
    if (closeModalBtn) closeModalBtn.addEventListener('click', () => modal.classList.remove('active'));

    const tabUploadBtn = document.getElementById('tabSnapshotUploadBtn');
    if (tabUploadBtn) {
      tabUploadBtn.addEventListener('click', () => {
        document.getElementById('excelFileInputTab').click();
      });
    }

    const dropzoneTab = document.getElementById('fileDropzoneTab');
    const fileInputTab = document.getElementById('excelFileInputTab');

    if (dropzoneTab && fileInputTab) {
      dropzoneTab.addEventListener('click', () => fileInputTab.click());
      dropzoneTab.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzoneTab.classList.add('dragover');
      });
      dropzoneTab.addEventListener('dragleave', () => dropzoneTab.classList.remove('dragover'));
      dropzoneTab.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzoneTab.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) handleExcelFile(e.dataTransfer.files[0]);
      });
      fileInputTab.addEventListener('change', (e) => {
        if (e.target.files.length > 0) handleExcelFile(e.target.files[0]);
      });
    }
  }

  function handleExcelFile(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonRows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        if (jsonRows.length < 3) {
          alert('올바른 삼성증권 SPOP 엑셀 양식이 아닙니다.');
          return;
        }

        const dateStr = String(jsonRows[0][0] || '').trim();
        const parsedDate = dateStr.slice(0, 10).replace(/\./g, '-');

        const items = [];
        let totalBuy = 0, totalEval = 0, totalProfit = 0;

        for (let i = 2; i < jsonRows.length; i++) {
          const row = jsonRows[i];
          if (!row || row.length < 7) continue;

          const acct = String(row[0] || '').trim();
          const name = String(row[1] || '').trim();
          if (!acct || !name) continue;

          const qty = parseFloat(String(row[3] || '0').replace(/,/g, '')) || 0;
          const price = parseFloat(String(row[4] || '0').replace(/,/g, '')) || 0;
          const buy = parseInt(String(row[5] || '0').replace(/,/g, '')) || 0;
          const evalAmt = parseInt(String(row[6] || '0').replace(/,/g, '')) || 0;
          const profit = parseInt(String(row[7] || '0').replace(/,/g, '')) || 0;
          const retRate = parseFloat(String(row[9] || '0').replace(/,/g, '')) || 0;

          totalBuy += buy;
          totalEval += evalAmt;
          totalProfit += profit;

          items.push({
            account: acct,
            name: name,
            qty: qty,
            price: price,
            buy: buy,
            eval: evalAmt,
            profit: profit,
            returnRate: retRate
          });
        }

        const newDataset = {
          date: parsedDate || new Date().toISOString().slice(0, 10),
          label: `${parsedDate} 스냅샷`,
          timestamp: dateStr,
          totalBuy: totalBuy,
          totalEval: totalEval,
          totalProfit: totalProfit,
          returnRate: totalBuy > 0 ? (totalProfit / totalBuy * 100) : 0,
          items: items
        };

        rawDatasets.push(newDataset);
        rawDatasets.sort((a, b) => new Date(a.date) - new Date(b.date));
        selectedSnapshotIndex = rawDatasets.findIndex(d => d.date === newDataset.date);

        const customOnly = rawDatasets.filter(d => d.date !== '2026-06-28' && d.date !== '2026-09-12');
        localStorage.setItem('js_investment_custom', JSON.stringify(customOnly));

        const modal = document.getElementById('uploadModal');
        if (modal) modal.classList.remove('active');
        alert(`${newDataset.date} 스냅샷 데이터가 성공적으로 추가되었습니다!`);

        renderDateButtons();
        renderDashboard();
      } catch (err) {
        console.error(err);
        alert('엑셀 파일을 파싱하는 도중 오류가 발생했습니다.');
      }
    };
    reader.readAsArrayBuffer(file);
  }

  document.addEventListener('DOMContentLoaded', () => {
    setupEvents();
    initData();
  });
})();
