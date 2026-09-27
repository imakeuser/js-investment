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
        { "account": "7164******-28 [퇴직연금(DC)]", "name": "KODEX 금액티브", "qty": 964.0, "price": 11955.0, "buy": 12324550, "eval": 11524620, "profit": -799930, "returnRate": -6.49 },
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
        { "account": "7164******-28 [퇴직연금(DC)]", "name": "KODEX 금액티브", "qty": 964.0, "price": 12290.0, "buy": 12324550, "eval": 11847560, "profit": -476990, "returnRate": -3.87 },
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

  // ==========================================
  // DB Status Banner & Notification Handler
  // ==========================================
  function showStatusNotice(msg, type = 'warning') {
    const noticeEl = document.getElementById('dbStatusNotice');
    if (!noticeEl) return;
    noticeEl.className = `db-status-notice ${type}`;
    noticeEl.innerHTML = `<i data-lucide="${type === 'warning' ? 'alert-triangle' : 'info'}"></i> <span>${msg}</span>`;
    noticeEl.style.display = 'flex';
    if (window.lucide) window.lucide.createIcons();
  }

  function hideStatusNotice() {
    const noticeEl = document.getElementById('dbStatusNotice');
    if (noticeEl) noticeEl.style.display = 'none';
  }

  // ==========================================
  // Excel ArrayBuffer Parser (Samsung Securities SPOP format)
  // ==========================================
  function parseSpopArrayBuffer(arrayBuffer, filename = '') {
    if (!window.XLSX) {
      throw new Error('SheetJS (XLSX) 라이브러리가 로드되지 않았습니다.');
    }
    const data = new Uint8Array(arrayBuffer);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonRows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    if (jsonRows.length < 3) {
      throw new Error('올바른 삼성증권 SPOP 엑셀 양식이 아닙니다.');
    }

    let dateStr = String(jsonRows[0][0] || '').trim();
    let parsedDate = dateStr.slice(0, 10).replace(/\./g, '-');
    if (!parsedDate || !parsedDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const match = filename.match(/(\d{2})(\d{2})(\d{2})/);
      if (match) {
        parsedDate = `20${match[1]}-${match[2]}-${match[3]}`;
      } else {
        parsedDate = new Date().toISOString().slice(0, 10);
      }
    }

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

    return {
      date: parsedDate,
      label: `${parsedDate} 스냅샷`,
      timestamp: dateStr || parsedDate,
      totalBuy: totalBuy,
      totalEval: totalEval,
      totalProfit: totalProfit,
      returnRate: totalBuy > 0 ? (totalProfit / totalBuy * 100) : 0,
      items: items
    };
  }

  // ==========================================
  // Data Initialization Module with spop_db Integration & Error Handling
  // ==========================================
  async function initData(forceDemo = false) {
    let loadedDatasets = [];
    let spopDbSuccessCount = 0;

    const isDbCleared = localStorage.getItem('js_db_cleared') === 'true';
    const deletedDatesJson = localStorage.getItem('js_deleted_snapshots');
    const deletedDates = new Set(deletedDatesJson ? JSON.parse(deletedDatesJson) : []);

    if (!isDbCleared || forceDemo) {
      if (forceDemo) {
        localStorage.removeItem('js_db_cleared');
        localStorage.removeItem('js_deleted_snapshots');
      }

      // 1. Try loading datasets from spop_db directory
      try {
        const manifestResp = await fetch('spop_db/manifest.json');
        if (manifestResp.ok) {
          const fileList = await manifestResp.json();
          if (Array.isArray(fileList) && fileList.length > 0) {
            for (const filename of fileList) {
              try {
                const fileResp = await fetch(`spop_db/${filename}`);
                if (fileResp.ok) {
                  const buf = await fileResp.arrayBuffer();
                  const dataset = parseSpopArrayBuffer(buf, filename);
                  if (dataset && dataset.items.length > 0) {
                    if (forceDemo || !deletedDates.has(dataset.date)) {
                      loadedDatasets.push(dataset);
                      spopDbSuccessCount++;
                    }
                  }
                }
              } catch (fileErr) {
                console.warn(`spop_db/${filename} file read error:`, fileErr);
              }
            }
          }
        }
      } catch (dbErr) {
        console.warn('spop_db manifest fetch error:', dbErr);
      }

      // 2. Fallback to initial_data.json / INITIAL_DATA if spop_db files are missing or failed
      if (loadedDatasets.length === 0 && (!isDbCleared || forceDemo)) {
        try {
          const resp = await fetch('initial_data.json');
          if (resp.ok) {
            const jsonDs = await resp.json();
            loadedDatasets = (forceDemo ? jsonDs : jsonDs.filter(d => !deletedDates.has(d.date)));
          } else {
            loadedDatasets = (forceDemo ? INITIAL_DATA : INITIAL_DATA.filter(d => !deletedDates.has(d.date)));
          }
        } catch (e) {
          loadedDatasets = (forceDemo ? INITIAL_DATA : INITIAL_DATA.filter(d => !deletedDates.has(d.date)));
        }
      } else {
        hideStatusNotice();
      }
    } else {
      hideStatusNotice();
    }

    // 3. Load custom uploaded datasets from localStorage
    const savedCustom = localStorage.getItem('js_investment_custom');
    if (savedCustom) {
      try {
        const parsed = JSON.parse(savedCustom);
        const existingDates = new Set(loadedDatasets.map(d => d.date));
        parsed.forEach(p => {
          if (!existingDates.has(p.date) && (forceDemo || !deletedDates.has(p.date))) {
            loadedDatasets.push(p);
          }
        });
      } catch(e) {}
    }

    rawDatasets = loadedDatasets;
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

    selectedSnapshotIndex = rawDatasets.length > 0 ? rawDatasets.length - 1 : -1;

    renderDateButtons();
    renderDashboard();

    // Preload KRX Master Database asynchronously
    loadKrxMasterDatabase().catch(err => console.warn('Background KRX load notice:', err));
  }

  function renderDateButtons() {
    const group = document.getElementById('dateSelectorGroup');
    if (!group) return;
    group.innerHTML = '';

    if (rawDatasets.length === 0) {
      group.innerHTML = '<span style="font-size: 13px; color: var(--text-muted); padding: 4px 8px;">등록된 스냅샷 데이터가 없습니다.</span>';
      const headerTextEl = document.getElementById('headerActiveDateText');
      if (headerTextEl) headerTextEl.innerText = '데이터 없음 (엑셀 업로드 필요)';
      return;
    }

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
    } else if (tabId === 'tab-stock-analysis') {
      renderStockAnalysisTab();
    }
  }
  window.switchTab = switchTab;

  function renderDashboard() {
    const latestIndex = rawDatasets.length - 1;
    const latestCurr = rawDatasets[latestIndex];
    const prevLatest = latestIndex > 0 ? rawDatasets[latestIndex - 1] : null;

    if (!latestCurr || rawDatasets.length === 0) {
      document.getElementById('kpiTotalEval').innerText = '0 원';
      document.getElementById('kpiTotalBuy').innerText = '0 원';
      
      const profitEl = document.getElementById('kpiTotalProfit');
      profitEl.innerText = '0 원';
      profitEl.style.color = 'var(--text-main)';
      document.getElementById('kpiProfitBadge').className = 'badge-trend';
      document.getElementById('kpiProfitBadge').innerText = '수익 0원';

      document.getElementById('kpiReturnRate').innerText = '0.00%';
      document.getElementById('kpiEvalTrend').innerText = '데이터 없음';
      document.getElementById('kpiEvalTrend').className = 'badge-trend';

      if (lineChartInstance) { lineChartInstance.destroy(); lineChartInstance = null; }
      if (pieChartInstance) { pieChartInstance.destroy(); pieChartInstance = null; }
      accountRowChartInstances.forEach(c => c && c.destroy());
      accountRowChartInstances = [];

      const accountsRowListEl = document.getElementById('accountsRowList');
      if (accountsRowListEl) {
        accountsRowListEl.innerHTML = `
          <div style="text-align: center; padding: 48px 20px; background: rgba(0,0,0,0.25); border-radius: var(--radius-md); border: 1px dashed var(--border-card);">
            <i data-lucide="inbox" style="width: 42px; height: 42px; margin-bottom: 12px; color: var(--text-dark);"></i>
            <h4 style="font-size: 16px; font-weight: 700; color: #ffffff; margin-bottom: 6px;">등록된 자산 데이터가 없습니다</h4>
            <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5;">
              <strong>투자 스냅샷</strong> 탭에서 삼성증권 엑셀 파일(spop_*.xlsx)을 업로드하면 통합 자산 현황과 분석 차트가 생성됩니다.
            </p>
          </div>
        `;
      }

      const accountsGridTab3 = document.getElementById('accountsGridTab3');
      if (accountsGridTab3) {
        accountsGridTab3.innerHTML = `
          <div style="text-align: center; padding: 40px; color: var(--text-muted); grid-column: 1 / -1;">
            등록된 계좌 데이터가 없습니다.
          </div>
        `;
      }

      const filterSel = document.getElementById('accountFilterSelect');
      if (filterSel) filterSel.innerHTML = '<option value="ALL">전체 계좌 보기</option>';

      renderStockTable();
      renderSnapshotsHistoryTable();
      if (activeTabId === 'tab-accounts') renderAccountBarChart();
      if (activeTabId === 'tab-stock-analysis') renderStockAnalysisTab();
      if (window.lucide) window.lucide.createIcons();
      return;
    }

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

    renderStockTable();
    renderSnapshotsHistoryTable();

    if (activeTabId === 'tab-accounts') {
      renderAccountBarChart();
    } else if (activeTabId === 'tab-stock-analysis') {
      renderStockAnalysisTab();
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

  let expandedStockAccount = null;
  let expandedStockName = null;
  let stockDetailChartInstance = null;

  function renderStockTable() {
    const curr = rawDatasets[selectedSnapshotIndex] || rawDatasets[rawDatasets.length - 1];
    if (!curr || !curr.items || curr.items.length === 0) {
      expandedStockAccount = null;
      expandedStockName = null;
      if (stockDetailChartInstance) {
        stockDetailChartInstance.destroy();
        stockDetailChartInstance = null;
      }
      const countEl = document.getElementById('holdingsCount');
      if (countEl) countEl.innerText = '0개';
      const evalEl = document.getElementById('holdingsTotalEval');
      if (evalEl) evalEl.innerText = '0원';
      const topG = document.getElementById('topGainItem');
      if (topG) topG.innerText = '-';
      const topGV = document.getElementById('topGainValue');
      if (topGV) topGV.innerText = '-';
      const topL = document.getElementById('topLossItem');
      if (topL) topL.innerText = '-';
      const topLV = document.getElementById('topLossValue');
      if (topLV) topLV.innerText = '-';

      const tbody = document.getElementById('stockTableBody');
      if (tbody) {
        tbody.innerHTML = `
          <tr>
            <td colspan="8" style="text-align: center; color: var(--text-muted); padding: 48px 20px;">
              <div style="font-size: 15px; font-weight: 600; margin-bottom: 6px; color: var(--text-main);">등록된 보유 종목 데이터가 없습니다.</div>
              <p style="font-size: 13px; color: var(--text-muted);"><strong>투자 스냅샷</strong> 탭에서 엑셀 파일(spop_*.xlsx)을 업로드해주세요.</p>
            </td>
          </tr>
        `;
      }
      if (window.lucide) window.lucide.createIcons();
      return;
    }

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
      }
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
      const nonCash = items.filter(it => !it.name.includes('예수금') && !it.name.includes('USD') && !it.name.includes('현금'));
      const pool = nonCash.length > 0 ? nonCash : items;
      const topGain = [...pool].sort((a,b) => b.profit - a.profit)[0];
      const topLoss = [...pool].sort((a,b) => a.profit - b.profit)[0];

      if (gainItemEl) gainItemEl.innerText = topGain ? topGain.name : '-';
      if (gainValEl) gainValEl.innerText = topGain && topGain.profit > 0 ? `+${formatKRW(topGain.profit)} (${formatPercent(topGain.returnRate)})` : '-';

      if (lossItemEl) lossItemEl.innerText = topLoss ? topLoss.name : '-';
      if (lossValEl) lossValEl.innerText = topLoss && topLoss.profit < 0 ? `${formatKRW(topLoss.profit)} (${formatPercent(topLoss.returnRate)})` : '-';
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

    let hasExpandedActiveRow = false;

    items.forEach(it => {
      const isExpanded = (expandedStockAccount === it.account && expandedStockName === it.name);
      if (isExpanded) hasExpandedActiveRow = true;

      const tr = document.createElement('tr');
      if (isExpanded) tr.classList.add('expanded-stock-row');

      const isProfit = it.profit >= 0;
      const profitClass = isProfit ? 'text-profit' : 'text-loss';
      const encAcct = encodeURIComponent(it.account);
      const encName = encodeURIComponent(it.name);

      tr.innerHTML = `
        <td style="font-size: 13px; color: var(--text-muted);">${it.account}</td>
        <td class="stock-name-cell" onclick="window.toggleStockDetailChart('${encAcct}', '${encName}')" title="클릭하여 ${it.name} 자산 변동 그래프 보기/닫기">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
            <span class="stock-name-text" style="font-weight: 700; ${isExpanded ? 'color: var(--accent-cyan);' : ''}">${it.name}</span>
            <i data-lucide="${isExpanded ? 'chevron-up' : 'line-chart'}" class="stock-chart-icon" style="width: 14px; height: 14px; color: ${isExpanded ? 'var(--accent-cyan)' : 'var(--primary)'}; opacity: ${isExpanded ? '1' : '0.6'}; flex-shrink: 0;"></i>
          </div>
        </td>
        <td class="num-col">${it.qty.toLocaleString()}</td>
        <td class="num-col">${it.price.toLocaleString()}원</td>
        <td class="num-col">${it.buy.toLocaleString()}원</td>
        <td class="num-col" style="font-weight: 700;">${it.eval.toLocaleString()}원</td>
        <td class="num-col ${profitClass}">${isProfit ? '+' : ''}${it.profit.toLocaleString()}원</td>
        <td class="num-col ${profitClass}">${formatPercent(it.returnRate)}</td>
      `;

      tbody.appendChild(tr);

      if (isExpanded) {
        const detailTr = document.createElement('tr');
        detailTr.className = 'stock-detail-row';
        detailTr.innerHTML = `
          <td colspan="8" style="padding: 0;">
            <div class="stock-detail-container" id="stockDetailContainer">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 10px;">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <div style="width: 32px; height: 32px; background: rgba(99, 102, 241, 0.2); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: var(--primary);">
                    <i data-lucide="trending-up" style="width: 16px; height: 16px;"></i>
                  </div>
                  <div>
                    <span style="font-size: 15px; font-weight: 800; color: #ffffff;">${it.name}</span>
                    <span style="font-size: 12px; color: var(--text-muted); margin-left: 6px;">[${it.account}]</span>
                    <span style="font-size: 12px; color: var(--accent-cyan); margin-left: 8px; font-weight: 600;">시계열 자산 변동 현황</span>
                  </div>
                </div>
                
                <div style="display: flex; align-items: center; gap: 14px;">
                  <div id="stockDetailKpis" style="display: flex; gap: 10px; font-size: 12px; flex-wrap: wrap;"></div>
                  <button class="btn-close-chart" onclick="window.closeStockDetailChart()" style="background: transparent; border: none; color: var(--text-muted); cursor: pointer; display: flex; align-items: center; padding: 4px;" title="그래프 닫기">
                    <i data-lucide="x" style="width: 16px; height: 16px;"></i>
                  </button>
                </div>
              </div>

              <!-- Canvas Container -->
              <div style="height: 190px; width: 100%; position: relative;">
                <canvas id="stockDetailCanvas"></canvas>
              </div>
            </div>
          </td>
        `;
        tbody.appendChild(detailTr);
      }
    });

    if (window.lucide) window.lucide.createIcons();

    if (hasExpandedActiveRow && expandedStockAccount && expandedStockName) {
      setTimeout(() => {
        renderInlineStockDetailChart(expandedStockAccount, expandedStockName);
      }, 50);
    }
  }

  window.toggleStockDetailChart = function(encAcct, encName) {
    const account = decodeURIComponent(encAcct);
    const name = decodeURIComponent(encName);

    if (expandedStockAccount === account && expandedStockName === name) {
      expandedStockAccount = null;
      expandedStockName = null;
      if (stockDetailChartInstance) {
        stockDetailChartInstance.destroy();
        stockDetailChartInstance = null;
      }
    } else {
      expandedStockAccount = account;
      expandedStockName = name;
    }

    renderStockTable();
  };

  window.closeStockDetailChart = function() {
    expandedStockAccount = null;
    expandedStockName = null;
    if (stockDetailChartInstance) {
      stockDetailChartInstance.destroy();
      stockDetailChartInstance = null;
    }
    renderStockTable();
  };

  function renderInlineStockDetailChart(account, name) {
    const canvas = document.getElementById('stockDetailCanvas');
    if (!canvas) return;

    if (stockDetailChartInstance) {
      stockDetailChartInstance.destroy();
      stockDetailChartInstance = null;
    }

    const labels = [];
    const evalData = [];
    const buyData = [];
    const profitData = [];
    const rateData = [];

    rawDatasets.forEach(ds => {
      labels.push(ds.date);
      const it = (ds.items || []).find(item => item.account === account && item.name === name);
      if (it) {
        evalData.push(it.eval || 0);
        buyData.push(it.buy || 0);
        profitData.push(it.profit || 0);
        rateData.push(it.returnRate || 0);
      } else {
        evalData.push(0);
        buyData.push(0);
        profitData.push(0);
        rateData.push(0);
      }
    });

    const latestEval = evalData[evalData.length - 1] || 0;
    const latestProfit = profitData[profitData.length - 1] || 0;
    const latestRate = rateData[rateData.length - 1] || 0;
    const isProfit = latestProfit >= 0;

    const kpisEl = document.getElementById('stockDetailKpis');
    if (kpisEl) {
      kpisEl.innerHTML = `
        <span style="color: var(--text-muted); background: rgba(0,0,0,0.3); padding: 4px 10px; border-radius: 6px; border: 1px solid var(--border-card);">
          최신 평가액: <strong style="color: #ffffff;">${formatKRW(latestEval)}</strong>
        </span>
        <span style="color: var(--text-muted); background: rgba(0,0,0,0.3); padding: 4px 10px; border-radius: 6px; border: 1px solid var(--border-card);">
          누적 손익: <strong style="color: ${isProfit ? 'var(--profit-green)' : 'var(--loss-red)'};">${isProfit ? '+' : ''}${formatKRW(latestProfit)} (${formatPercent(latestRate)})</strong>
        </span>
      `;
    }

    const ctx = canvas.getContext('2d');
    stockDetailChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: '평가금액',
            data: evalData,
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99, 102, 241, 0.15)',
            borderWidth: 2.5,
            fill: true,
            tension: 0.3,
            pointRadius: 5,
            pointHoverRadius: 7
          },
          {
            label: '매수금액',
            data: buyData,
            borderColor: '#9ca3af',
            borderDash: [5, 5],
            borderWidth: 1.8,
            fill: false,
            tension: 0.3,
            pointRadius: 4
          },
          {
            label: '평가손익',
            data: profitData,
            borderColor: isProfit ? '#10b981' : '#f43f5e',
            backgroundColor: isProfit ? 'rgba(16, 185, 129, 0.08)' : 'rgba(244, 63, 94, 0.08)',
            borderWidth: 2,
            fill: false,
            tension: 0.3,
            pointRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          datalabels: { display: false },
          legend: {
            position: 'top',
            align: 'end',
            labels: { color: '#9ca3af', boxWidth: 12, font: { family: 'Outfit', size: 11 } }
          },
          tooltip: {
            callbacks: {
              label: (c) => c.dataset.label + ': ' + formatKRW(c.raw)
            }
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255, 255, 255, 0.04)' },
            ticks: { color: '#9ca3af', font: { size: 11 } }
          },
          y: {
            grid: { color: 'rgba(255, 255, 255, 0.04)' },
            ticks: {
              color: '#9ca3af',
              font: { size: 10 },
              callback: (v) => {
                if (Math.abs(v) >= 100000000) return (v / 100000000).toFixed(1) + '억';
                if (Math.abs(v) >= 10000) return (v / 10000).toFixed(0) + '만';
                return v.toLocaleString() + '원';
              }
            }
          }
        }
      }
    });
  }

  function renderSnapshotsHistoryTable() {
    const tbody = document.getElementById('snapshotsHistoryTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (rawDatasets.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; color: var(--text-muted); padding: 40px 20px;">
            <div style="font-size: 15px; font-weight: 600; margin-bottom: 6px; color: var(--text-main);">등록된 스냅샷 히스토리가 없습니다.</div>
            <p style="font-size: 13px; color: var(--text-muted);">상단 드롭존에서 엑셀 파일(spop_*.xlsx)을 업로드하여 스냅샷을 추가하세요.</p>
          </td>
        </tr>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

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
          <div style="display: inline-flex; align-items: center; gap: 8px; justify-content: center;">
            ${isSelected ? 
              `<span class="badge-active-snap" style="display: inline-flex; align-items: center; gap: 4px;"><i data-lucide="check" style="width: 12px; height: 12px;"></i> 조회중</span>` : 
              `<button class="btn-select-snap" onclick="window.selectSnapshotIndex(${idx})">스냅샷 조회</button>`
            }
            <button class="btn-delete-snap" onclick="window.deleteSnapshot(${idx})" title="${ds.date} 스냅샷 삭제">
              <i data-lucide="trash-2" style="width: 13px; height: 13px;"></i> 삭제
            </button>
          </div>
        </td>
      `;

      tbody.appendChild(tr);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  window.selectSnapshotIndex = function(idx) {
    selectedSnapshotIndex = idx;
    renderDateButtons();
    renderDashboard();
    switchTab('tab-holdings');
  };

  window.deleteSnapshot = function(idx) {
    if (idx < 0 || idx >= rawDatasets.length) return;
    const target = rawDatasets[idx];
    const targetDate = target.date || `Snap #${idx + 1}`;

    const ok = confirm(`정말로 [${targetDate}] 스냅샷 데이터를 삭제하시겠습니까?\n\n- 이 작업은 해당 날짜의 스냅샷 데이터를 목록과 차트에서 완전히 제거합니다.`);
    if (!ok) return;

    // 1. Remove from in-memory array
    rawDatasets.splice(idx, 1);

    // 2. Add to deleted snapshots blacklist in localStorage
    const deletedDatesJson = localStorage.getItem('js_deleted_snapshots');
    const deletedDates = deletedDatesJson ? JSON.parse(deletedDatesJson) : [];
    if (!deletedDates.includes(target.date)) {
      deletedDates.push(target.date);
      localStorage.setItem('js_deleted_snapshots', JSON.stringify(deletedDates));
    }

    // 3. Update js_investment_custom in localStorage
    const savedCustom = localStorage.getItem('js_investment_custom');
    if (savedCustom) {
      try {
        const parsed = JSON.parse(savedCustom);
        const updated = parsed.filter(d => d.date !== target.date);
        localStorage.setItem('js_investment_custom', JSON.stringify(updated));
      } catch(e) {}
    }

    // 4. Update selectedSnapshotIndex
    if (rawDatasets.length === 0) {
      selectedSnapshotIndex = -1;
      localStorage.setItem('js_db_cleared', 'true');
    } else {
      if (selectedSnapshotIndex >= rawDatasets.length) {
        selectedSnapshotIndex = rawDatasets.length - 1;
      } else if (selectedSnapshotIndex === idx) {
        selectedSnapshotIndex = Math.max(0, idx - 1);
      } else if (selectedSnapshotIndex > idx) {
        selectedSnapshotIndex--;
      }
    }

    // 5. Re-render UI
    renderDateButtons();
    renderDashboard();
    renderSnapshotsHistoryTable();
    if (window.lucide) window.lucide.createIcons();

    alert(`[${targetDate}] 스냅샷이 성공적으로 삭제되었습니다.`);
  };

  // ==========================================
  // KRX Master Database & Multi-Tier Fast Stock Sync Engine
  // ==========================================
  let krxMasterDb = {};
  let krxMasterLoaded = false;
  let cachedKrxTimeSeries = {}; // in-memory cache: code -> { date: price }
  let lastSyncStats = { count: 0, durationMs: 0, items: [] };

  // Strict cash-like asset filter
  function isCashLikeAsset(name) {
    if (!name) return true;
    const trimmed = name.trim();
    return /예수금|현금|외화예수금|외화잔고|CMA|MMF|현금성자산|삼성신종종류형|예치금|원화예수금|외화예치금/i.test(trimmed);
  }

  let krxSearchKeyMap = {}; // pre-indexed search key -> master item
  
  // Helper to build normalized alphanumeric search key (case-insensitive, whitespace & symbol normalization)
  function buildKrxSearchKey(str) {
    if (!str) return '';
    return str
      .toLowerCase()
      .replace(/[\s\(\)\[\]\_\-\,\.\/\+]/g, '');
  }

  // Official ETF brand renewals / aliases (KBSTAR <-> RISE, ARIRANG <-> PLUS, KINDEX <-> ACE, SMART <-> SOL)
  const krxBrandAliases = [
    ['kbstar', 'rise'],
    ['arirang', 'plus'],
    ['kindex', 'ace'],
    ['smart', 'sol']
  ];

  function rebuildKrxSearchKeyIndex() {
    krxSearchKeyMap = {};
    for (const code in krxMasterDb) {
      const item = krxMasterDb[code];
      const sKey = buildKrxSearchKey(item.name);
      if (!krxSearchKeyMap[sKey]) krxSearchKeyMap[sKey] = item;
    }
  }

  // Load KRX Master Database (4,300+ items from krx_master.json with resilient fallback)
  async function loadKrxMasterDatabase() {
    if (krxMasterLoaded && Object.keys(krxMasterDb).length > 0) return krxMasterDb;
    try {
      const resp = await fetch('krx_master.json');
      if (resp.ok) {
        krxMasterDb = await resp.json();
        krxMasterLoaded = true;
        rebuildKrxSearchKeyIndex();
        console.log(`[KRX] Successfully loaded ${Object.keys(krxMasterDb).length} items from krx_master.json`);
        renderStockChipContainer();
        return krxMasterDb;
      }
    } catch (e) {
      console.warn('[KRX] Failed to fetch krx_master.json, utilizing built-in fallback:', e);
    }

    // Built-in emergency master fallback dictionary
    krxMasterDb = {
      "005930": { "code": "005930", "name": "삼성전자", "market": "KOSPI", "type": "STOCK" },
      "005935": { "code": "005935", "name": "삼성전자우", "market": "KOSPI", "type": "STOCK" },
      "000660": { "code": "000660", "name": "SK하이닉스", "market": "KOSPI", "type": "STOCK" },
      "015760": { "code": "015760", "name": "한국전력", "market": "KOSPI", "type": "STOCK" },
      "069500": { "code": "069500", "name": "KODEX 200", "market": "ETF", "type": "ETF" },
      "278530": { "code": "278530", "name": "KODEX 200TR", "market": "ETF", "type": "ETF" },
      "360750": { "code": "360750", "name": "TIGER 미국S&P500", "market": "ETF", "type": "ETF" },
      "133690": { "code": "133690", "name": "TIGER 미국나스닥100", "market": "ETF", "type": "ETF" },
      "379800": { "code": "379800", "name": "KODEX 미국나스닥100TR", "market": "ETF", "type": "ETF" },
      "379810": { "code": "379810", "name": "KODEX 미국S&P500TR", "market": "ETF", "type": "ETF" },
      "446720": { "code": "446720", "name": "SOL 미국배당다우존스", "market": "ETF", "type": "ETF" },
      "411060": { "code": "411060", "name": "ACE KRX금현물", "market": "ETF", "type": "ETF" },
      "091160": { "code": "091160", "name": "KODEX 반도체", "market": "ETF", "type": "ETF" },
      "466950": { "code": "466950", "name": "SOL 반도체TOP3플러스", "market": "ETF", "type": "ETF" },
      "245340": { "code": "245340", "name": "ACE 베트남VN30(합성)", "market": "ETF", "type": "ETF" },
      "395160": { "code": "395160", "name": "KODEX 인도Nifty50", "market": "ETF", "type": "ETF" },
      "364980": { "code": "364980", "name": "TIGER 미국우주테크", "market": "ETF", "type": "ETF" },
      "465580": { "code": "465580", "name": "KODEX 미국AI전력핵심인프라", "market": "ETF", "type": "ETF" },
      "474220": { "code": "474220", "name": "KODEX 금융고배당TOP10타겟위클리커버드콜", "market": "ETF", "type": "ETF" },
      "482730": { "code": "482730", "name": "KODEX 200타겟위클리커버드콜", "market": "ETF", "type": "ETF" },
      "426020": { "code": "426020", "name": "KoAct 코리아액티브", "market": "ETF", "type": "ETF" },
      "446690": { "code": "446690", "name": "KODEX 로봇액티브", "market": "ETF", "type": "ETF" },
      "449170": { "code": "449170", "name": "KODEX 원자력SMR", "market": "ETF", "type": "ETF" },
      "453850": { "code": "453850", "name": "KODEX 한국부동산리츠인프라", "market": "ETF", "type": "ETF" },
      "329200": { "code": "329200", "name": "TIGER 리츠부동산인프라", "market": "ETF", "type": "ETF" },
      "429740": { "code": "429740", "name": "KODEX TDF2050액티브 적격", "market": "ETF", "type": "ETF" },
      "429730": { "code": "429730", "name": "TIGER TDF2045 적격", "market": "ETF", "type": "ETF" },
      "139280": { "code": "139280", "name": "TIGER 머니마켓액티브", "market": "ETF", "type": "ETF" },
      "371460": { "code": "371460", "name": "TIGER 차이나테크TOP10", "market": "ETF", "type": "ETF" },
      "144600": { "code": "144600", "name": "KODEX 은선물(H)", "market": "ETF", "type": "ETF" },
      "457810": { "code": "457810", "name": "KODEX iShares미국하이일드액티브", "market": "ETF", "type": "ETF" },
      "457820": { "code": "457820", "name": "KODEX iShares미국인플레이션국채액티브", "market": "ETF", "type": "ETF" },
      "457830": { "code": "457830", "name": "KODEX iShares미국투자등급회사채액티브", "market": "ETF", "type": "ETF" },
      "473460": { "code": "473460", "name": "KODEX 미국서학개미", "market": "ETF", "type": "ETF" },
      "0163Y0": { "code": "0163Y0", "name": "KoAct 코스닥액티브", "market": "ETF", "type": "ETF" },
      "0064K0": { "code": "0064K0", "name": "KODEX 금액티브", "market": "ETF", "type": "ETF" },
      "0025N0": { "code": "0025N0", "name": "TIGER TDF2045", "market": "ETF", "type": "ETF" },
      "0015B0": { "code": "0015B0", "name": "KoAct 미국나스닥성장기업액티브", "market": "ETF", "type": "ETF" }
    };
    krxMasterLoaded = true;
    rebuildKrxSearchKeyIndex();
    return krxMasterDb;
  }

  // Pure Authentic KRX Stock Matcher
  function matchKrxStock(rawName) {
    if (!rawName) return null;
    const cleanName = rawName.trim();

    // 1. Direct key match by exact name
    for (const code in krxMasterDb) {
      const item = krxMasterDb[code];
      if (item.name === cleanName) {
        return { code: item.code, name: item.name, market: item.market, type: item.type, isMatched: true, method: 'Exact' };
      }
    }

    // 2. Normalized Search Key Exact Match (Spaces & Punctuation normalized)
    const rawKey = buildKrxSearchKey(cleanName);
    if (krxSearchKeyMap[rawKey]) {
      const it = krxSearchKeyMap[rawKey];
      return { code: it.code, name: it.name, market: it.market, type: it.type, isMatched: true, method: 'SearchKey' };
    }

    // 3. Official Brand Renewal Aliases (KBSTAR <-> RISE, ARIRANG <-> PLUS, KINDEX <-> ACE, SMART <-> SOL)
    for (const [b1, b2] of krxBrandAliases) {
      let altKey = rawKey;
      if (altKey.includes(b1)) altKey = altKey.replace(b1, b2);
      else if (altKey.includes(b2)) altKey = altKey.replace(b2, b1);
      if (krxSearchKeyMap[altKey]) {
        const it = krxSearchKeyMap[altKey];
        return { code: it.code, name: it.name, market: it.market, type: it.type, isMatched: true, method: 'BrandAlias' };
      }
    }

    // 4. Non-ticker / Unlisted instrument fallback (Displayed as unmatched)
    return {
      code: "KRX-" + Math.abs(cleanName.split('').reduce((a,b)=>{a=((a<<5)-a)+b.charCodeAt(0);return a&a},0)).toString().slice(0,4).padStart(4,'0'),
      name: cleanName,
      market: "KRX",
      type: "STOCK",
      isMatched: false,
      method: 'Unmatched'
    };
  }

  // Multi-source Fast Stock Time-Series Fetcher
  async function fetchStockTimeSeriesMultiSource(matchedInfo, snapshotDates) {
    const startTime = performance.now();
    const code = matchedInfo.code;
    const name = matchedInfo.name;

    // Check memory & localStorage cache
    const cacheKey = `js_krx_ts_${code}`;
    if (cachedKrxTimeSeries[code]) {
      const elapsed = Math.round(performance.now() - startTime);
      return {
        code,
        name,
        market: matchedInfo.market,
        source: '메모리 캐시',
        latencyMs: elapsed,
        prices: cachedKrxTimeSeries[code],
        status: 'cached'
      };
    }

    try {
      const localStored = localStorage.getItem(cacheKey);
      if (localStored) {
        const parsed = JSON.parse(localStored);
        if (parsed && typeof parsed === 'object') {
          cachedKrxTimeSeries[code] = parsed;
          const elapsed = Math.round(performance.now() - startTime);
          return {
            code,
            name,
            market: matchedInfo.market,
            source: '로컬 스토리지 캐시',
            latencyMs: elapsed,
            prices: parsed,
            status: 'cached'
          };
        }
      }
    } catch(e) {}

    // Only try network fetch for valid 6-char KRX stock/ETF codes (supports alphanumeric tickers like 0163Y0)
    if (matchedInfo.isMatched && /^[0-9A-Za-z]{6}$/.test(code)) {
      // 1. Try Naver FChart XML API via CORS proxy with aggressive timeout (2.0s)
      const targetUrl = `https://fchart.stock.naver.com/sise.nhn?symbol=${code}&timeframe=day&count=500&requestType=0`;
      const proxyUrls = [
        `/api/proxy?url=${encodeURIComponent(targetUrl)}`,
        targetUrl,
        `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`,
        `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`
      ];

      for (const pUrl of proxyUrls) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 2000);
          const resp = await fetch(pUrl, { signal: controller.signal });
          clearTimeout(timeoutId);

          if (resp.ok) {
            const xmlText = await resp.text();
            if (xmlText.includes('<item data=')) {
              const priceMap = {};
              const regex = /<item data="(\d{8})\|(\d+(?:\.\d+)?)\|(\d+(?:\.\d+)?)\|(\d+(?:\.\d+)?)\|(\d+(?:\.\d+)?)/g;
              let match;
              let candleCount = 0;
              while ((match = regex.exec(xmlText)) !== null) {
                const rawD = match[1];
                const dStr = `${rawD.slice(0,4)}-${rawD.slice(4,6)}-${rawD.slice(6,8)}`;
                const closePrice = parseFloat(match[5]);
                priceMap[dStr] = closePrice;
                candleCount++;
              }

              if (candleCount > 0) {
                cachedKrxTimeSeries[code] = priceMap;
                try { localStorage.setItem(cacheKey, JSON.stringify(priceMap)); } catch(e){}
                const elapsed = Math.round(performance.now() - startTime);
                return {
                  code,
                  name,
                  market: matchedInfo.market,
                  source: `네이버 증권 시세 API (${candleCount}개)`,
                  latencyMs: elapsed,
                  prices: priceMap,
                  status: 'success'
                };
              }
            }
          }
        } catch(netErr) {
          // Continue to next fallback
        }
      }
    }

    // Fallback: Construct price series from internal snapshot history (100% resilient)
    const fallbackPrices = {};
    rawDatasets.forEach(ds => {
      const it = (ds.items || []).find(x => x.name.trim() === matchedInfo.name.trim() || x.name.trim() === name);
      if (it) {
        const p = it.price > 0 ? it.price : (it.qty > 0 ? Math.round(it.eval / it.qty) : null);
        if (p) fallbackPrices[ds.date] = p;
      }
    });

    cachedKrxTimeSeries[code] = fallbackPrices;
    const elapsed = Math.round(performance.now() - startTime);
    return {
      code,
      name,
      market: matchedInfo.market,
      source: '스냅샷 내부 시세 백업',
      latencyMs: elapsed,
      prices: fallbackPrices,
      status: 'fallback'
    };
  }

  // ==========================================
  // Stock Price & Similarity Analysis Module
  // ==========================================
  let selectedStockAnalysisName = "";
  let stockChartMode = "normalized"; // "normalized" | "actual"
  let activeCorrSubTab = "high_similarity"; // "high_similarity" | "hedge_diversity" | "heatmap" | "custom_duo"
  let saStartYear = "2024";
  let saStartMonth = "01";
  let saIntervalType = "monthly"; // "monthly" | "quarterly"
  let saSelectedStockNamesSet = null; // Set of selected stock names for analysis
  let isGraphDrawn = false; // Flag indicating if user clicked Sync & Draw button
  let stockAnalysisChartInstance = null;
  let duoChartInstance = null;
  let duoSelectedStockA = "";
  let duoSelectedStockB = "";

  const stockColorPalette = ['#6366f1', '#06b6d4', '#ec4899', '#8b5cf6', '#10b981', '#f59e0b', '#3b82f6', '#f43f5e', '#14b8a6', '#a855f7'];

  // Standard Benchmark series mapped across snapshot dates
  function getBenchmarkDataMap() {
    const sp500Prices = {
      "2026-06-28": 5464.6,
      "2026-09-12": 5626.0
    };
    const kospi200Prices = {
      "2026-06-28": 370.5,
      "2026-09-12": 352.0
    };
    return { sp500Prices, kospi200Prices };
  }

  // Handle Sync Stock Prices & Draw Chart Button Click
  async function handleSyncAndDraw() {
    const btn = document.getElementById('btnSyncAndDraw');
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<i data-lucide="refresh-cw" class="animate-spin"></i><span>KRX 4,300+ 마스터 대조 & 초고속 동기화 중...</span>';
      if (window.lucide) window.lucide.createIcons();
    }

    const syncStartTime = performance.now();

    // Ensure KRX master DB is loaded
    await loadKrxMasterDatabase();

    // Collect selected non-cash stocks
    const allHeld = getAllHeldStockNames();
    if (saSelectedStockNamesSet === null) {
      saSelectedStockNamesSet = new Set(allHeld.map(s => s.name));
    }

    const targetStocks = allHeld.filter(s => saSelectedStockNamesSet.has(s.name));
    
    // Show HUD
    const hudEl = document.getElementById('saKrxSyncHud');
    const pillsContainer = document.getElementById('saKrxStockPillsContainer');
    const masterStatusEl = document.getElementById('saKrxMasterStatus');
    const speedTextEl = document.getElementById('saKrxSpeedText');

    if (hudEl) hudEl.style.display = 'none'; // Hidden by user request
    if (pillsContainer) pillsContainer.innerHTML = '';

    // Match all target stocks against KRX Master DB
    const matchedTargets = targetStocks.map(s => ({
      original: s.name,
      match: matchKrxStock(s.name)
    }));

    // Fetch in parallel for ALL targets (unlisted items fall through to snapshot fallback instantly)
    const fetchPromises = matchedTargets.map(item => 
      fetchStockTimeSeriesMultiSource(item.match, rawDatasets.map(d => d.date))
    );

    const results = await Promise.allSettled(fetchPromises);
    const totalDuration = Math.round(performance.now() - syncStartTime);

    // Populate HUD pills for all synced targets
    if (pillsContainer) {
      results.forEach((res, idx) => {
        const itemInfo = matchedTargets[idx];
        const resData = res.status === 'fulfilled' ? res.value : {
          code: itemInfo.match.code,
          name: itemInfo.original,
          market: itemInfo.match.market,
          source: '스냅샷 내부 시세 에러',
          latencyMs: 10,
          status: 'error'
        };

        const pill = document.createElement('div');
        pill.className = 'krx-pill-card';
        const mClass = (resData.market || 'krx').toLowerCase();
        
        pill.innerHTML = `
          <span class="krx-pill-market ${mClass}">${resData.market}</span>
          <span class="krx-pill-code">${resData.code}</span>
          <span class="krx-pill-name">${resData.name}</span>
          <span class="krx-pill-source ${resData.status}">
            <i data-lucide="${resData.status === 'cached' ? 'zap' : 'check-circle'}" style="width: 12px; height: 12px;"></i>
            ${resData.source} (${resData.latencyMs}ms)
          </span>
        `;
        pillsContainer.appendChild(pill);
      });
      if (window.lucide) window.lucide.createIcons();
    }

    if (masterStatusEl) {
      masterStatusEl.innerText = `KRX 상장 ${Object.keys(krxMasterDb).length.toLocaleString()}개 종목 대조 완료 · 선택된 총 ${matchedTargets.length}개 종목 차트 시계열 확보 완료`;
    }
    if (speedTextEl) {
      speedTextEl.innerText = `총 동기화 완료: ${totalDuration}ms`;
    }

    isGraphDrawn = true;

    const emptyPrompt = document.getElementById('saEmptyPrompt');
    const chartWrapper = document.getElementById('saChartWrapper');
    if (emptyPrompt) emptyPrompt.style.display = 'none';
    if (chartWrapper) chartWrapper.style.display = 'block';

    const titleEl = document.getElementById('saChartSectionTitle');
    if (titleEl) {
      titleEl.innerText = `${saIntervalType === 'quarterly' ? '분기별' : '월간'} 주가 변동 트렌드 (${saStartYear}년 ${parseInt(saStartMonth)}월 기준)`;
    }

    renderStockAnalysisTab();

    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<i data-lucide="line-chart"></i><span>주가 동기화 및 그래프 그리기 완료 (재동기화)</span>';
      if (window.lucide) window.lucide.createIcons();
    }

    const chartSection = document.getElementById('saChartSection');
    if (chartSection) {
      chartSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Handle Refresh Stocks & Re-sync Ticker Matching
  async function handleRefreshStocks() {
    const btn1 = document.getElementById('btnSaRefreshStocks');
    const btn2 = document.getElementById('btnSaRefreshStocksHeader');
    const icon1 = btn1 ? btn1.querySelector('i') : null;
    const icon2 = btn2 ? btn2.querySelector('i') : null;

    if (icon1) icon1.classList.add('animate-spin');
    if (icon2) icon2.classList.add('animate-spin');

    // 1. Ensure KRX master DB is fresh and SearchKey index rebuilt
    await loadKrxMasterDatabase();

    // 2. Re-extract all non-cash held stocks across snapshots
    const allStocks = getAllHeldStockNames();

    if (saSelectedStockNamesSet === null || saSelectedStockNamesSet.size === 0) {
      saSelectedStockNamesSet = new Set(allStocks.map(s => s.name));
    } else {
      // Keep existing user selections and add any newly discovered stocks
      allStocks.forEach(s => {
        if (!saSelectedStockNamesSet.has(s.name)) {
          saSelectedStockNamesSet.add(s.name);
        }
      }
    }
  });
    }

    // 3. Re-render stock selection chips with updated ticker matched / unmatched status
    renderStockChipContainer();

    if (isGraphDrawn) {
      renderStockAnalysisChart();
      renderStockCorrelationContent();
    }

    setTimeout(() => {
      if (icon1) icon1.classList.remove('animate-spin');
      if (icon2) icon2.classList.remove('animate-spin');
    }, 450);
  }

  // Get all unique non-cash held stock items across all snapshots
  function getAllHeldStockNames() {
    const map = {};
    rawDatasets.forEach(ds => {
      (ds.items || []).forEach(it => {
        const name = (it.name || '').trim();
        if (!name || isCashLikeAsset(name)) return;
        if (!map[name]) {
          map[name] = { name: name, theme: detectStockTheme(name) };
        }
      }
    }
  });
    });
    return Object.values(map).sort((a, b) => a.name.localeCompare(b.name));
  }

  // Render Stock Chips for Multiselect
  function renderStockChipContainer() {
    const chipContainer = document.getElementById('saStockChipContainer');
    if (!chipContainer) return;

    const allStocks = getAllHeldStockNames();
    if (saSelectedStockNamesSet === null) {
      saSelectedStockNamesSet = new Set(allStocks.map(s => s.name));
    }

    const countBadge = document.getElementById('saSelectedStockCountBadge');
    if (countBadge) {
      countBadge.innerText = `${saSelectedStockNamesSet.size} / ${allStocks.length}개 선택됨`;
    }

    chipContainer.innerHTML = '';

    if (allStocks.length === 0) {
      chipContainer.innerHTML = '<span style="color: var(--text-muted); font-size: 13px;">보유 종목이 없습니다.</span>';
      return;
    }

    allStocks.forEach(stock => {
      const isChecked = saSelectedStockNamesSet.has(stock.name);
      const matched = matchKrxStock(stock.name);
      const isTickerMatched = Boolean(matched && matched.isMatched);

      const label = document.createElement('label');
      label.className = `stock-chip ${isChecked ? 'active' : ''} ${isTickerMatched ? '' : 'unmatched-ticker'}`;
      if (!isTickerMatched) {
        label.title = `${stock.name}: KRX 상장 종목코드(티커) 미매칭 (버튼 아래 차트에서 제외됨)`;
      }

      label.innerHTML = `
        <input type="checkbox" value="${stock.name}" ${isChecked ? 'checked' : ''}>
        <span class="chip-name">${stock.name}</span>
        <span class="chip-theme">${stock.theme}</span>
        ${isTickerMatched ? '' : '<span class="chip-unmatched-badge" title="티커 미매칭 (차트 미포함)">미동기화</span>'}
      `;

      const chk = label.querySelector('input');
      chk.addEventListener('change', (e) => {
        if (e.target.checked) {
          saSelectedStockNamesSet.add(stock.name);
        } else {
          saSelectedStockNamesSet.delete(stock.name);
        }
        renderStockChipContainer();
        if (isGraphDrawn) {
          renderStockAnalysisChart();
          renderStockCorrelationContent();
        }
      }
    }
  });

      chipContainer.appendChild(label);
    });
  }

  // Helper to find closest value in a date-keyed object
  function getClosestValue(mapObj, targetDateStr) {
    if (!mapObj) return null;
    if (mapObj[targetDateStr] !== undefined && mapObj[targetDateStr] !== null) return mapObj[targetDateStr];
    
    let closestDate = null;
    for (const d of Object.keys(mapObj).sort()) {
      if (d <= targetDateStr) {
        closestDate = d;
      } else {
        break;
      }
    }
    return closestDate ? mapObj[closestDate] : null;
  }

  // Extract unique stock series across all snapshots with period, interval & stock selection filter
  function extractStockSeriesMap() {
    const startYearEl = document.getElementById('saStartYearSelect');
    const startMonthEl = document.getElementById('saStartMonthSelect');
    if (startYearEl) saStartYear = startYearEl.value;
    if (startMonthEl) saStartMonth = startMonthEl.value;

    const intervalRad = document.querySelector('input[name="saIntervalType"]:checked');
    if (intervalRad) saIntervalType = intervalRad.value;

    const allStocks = getAllHeldStockNames();
    if (saSelectedStockNamesSet === null) {
      saSelectedStockNamesSet = new Set(allStocks.map(s => s.name));
    }

    const startYearInt = parseInt(saStartYear, 10);
    const startMonthInt = parseInt(saStartMonth, 10);
    const today = new Date();
    
    const targetDates = [];
    if (saIntervalType === 'quarterly') {
        let q = Math.ceil(startMonthInt / 3);
        let currY = startYearInt;
        while (true) {
            let lastDay = new Date(currY, q * 3, 0);
            if (lastDay > today) lastDay = today;
            const dStr = `${lastDay.getFullYear()}-${String(lastDay.getMonth()+1).padStart(2,'0')}-${String(lastDay.getDate()).padStart(2,'0')}`;
            targetDates.push(dStr);
            
            if (lastDay.getTime() === today.getTime() || (currY === today.getFullYear() && q === Math.ceil((today.getMonth()+1)/3))) {
                break;
            }
            q++;
            if (q > 4) { q = 1; currY++; }
        }
    } else {
        let currM = startMonthInt;
        let currY = startYearInt;
        while (true) {
            let lastDay = new Date(currY, currM, 0);
            if (lastDay > today) lastDay = today;
            const dStr = `${lastDay.getFullYear()}-${String(lastDay.getMonth()+1).padStart(2,'0')}-${String(lastDay.getDate()).padStart(2,'0')}`;
            targetDates.push(dStr);
            
            if (lastDay.getTime() === today.getTime() || (currY === today.getFullYear() && currM === today.getMonth() + 1)) {
                break;
            }
            currM++;
            if (currM > 12) { currM = 1; currY++; }
        }
    }

    const stockMap = {};
    const dates = targetDates;

    // Pre-build snapshot lookup maps for evals, buys, etc. (since these are not in cachedKrxTimeSeries)
    const snapshotDataMap = {};
    rawDatasets.forEach(ds => {
      (ds.items || []).forEach(it => {
        const name = (it.name || '').trim();
        if (!name) return;
        if (!snapshotDataMap[name]) snapshotDataMap[name] = { evals: {}, buys: {}, profits: {}, returns: {} };
        snapshotDataMap[name].evals[ds.date] = it.eval || 0;
        snapshotDataMap[name].buys[ds.date] = it.buy || 0;
        snapshotDataMap[name].profits[ds.date] = it.profit || 0;
        snapshotDataMap[name].returns[ds.date] = it.returnRate || 0;
      });
    });

    saSelectedStockNamesSet.forEach(name => {
      // Strict cash-like asset filter
      if (isCashLikeAsset(name)) return;

      const matched = matchKrxStock(name);
      if (!matched) return;

      if (!stockMap[name]) {
        stockMap[name] = {
          name: name,
          code: matched.code,
          market: matched.market,
          theme: detectStockTheme(name),
          prices: {},
          evals: {},
          buys: {},
          profits: {},
          returns: {}
        };
      }

      const cachedPrices = cachedKrxTimeSeries[matched.code] || {};
      const snapData = snapshotDataMap[name] || { evals: {}, buys: {}, profits: {}, returns: {} };

      dates.forEach(dStr => {
        // Find closest price
        const price = getClosestValue(cachedPrices, dStr);
        stockMap[name].prices[dStr] = price;
        
        // Find closest eval, buy, etc from snapshots
        stockMap[name].evals[dStr] = getClosestValue(snapData.evals, dStr) || 0;
        stockMap[name].buys[dStr] = getClosestValue(snapData.buys, dStr) || 0;
        stockMap[name].profits[dStr] = getClosestValue(snapData.profits, dStr) || 0;
        stockMap[name].returns[dStr] = getClosestValue(snapData.returns, dStr) || 0;
      });

      // Exclude stocks that have no valid prices at all across the selected dates
      const hasValidPrice = dates.some(dStr => stockMap[name].prices[dStr] !== null && stockMap[name].prices[dStr] !== undefined);
      if (!hasValidPrice) {
        delete stockMap[name];
      }
    });

    return { stockMap, dates };
  }

  // Detect stock thematic tag
  function detectStockTheme(name) {
    const themes = [
      { tag: "S&P 500 지수", regex: /S&P|s&p|에스앤피/i },
      { tag: "나스닥 100 지수", regex: /나스닥|NASDAQ|nasdaq/i },
      { tag: "TDF 연금 자산", regex: /TDF|tdf/i },
      { tag: "금/은 원자재", regex: /금현물|금액티브|KRX금|은선물/i },
      { tag: "반도체 테마", regex: /반도체|SOXX|칩/i },
      { tag: "로봇/휴머노이드", regex: /로봇|휴머노이드/i },
      { tag: "인도 시장", regex: /인도|Nifty/i },
      { tag: "채권/금리 자산", regex: /국고채|회사채|하이일드|인플레이션국채|채권/i },
      { tag: "우주/항공 테크", regex: /우주테크|우주/i },
      { tag: "고배당/커버드콜", regex: /배당|커버드콜|타겟위클리/i },
      { tag: "베트남/신흥국", regex: /베트남|VN30/i },
      { tag: "부동산/리츠", regex: /리츠|부동산/i },
    ];

    for (const t of themes) {
      if (t.regex.test(name)) return t.tag;
    }
    return "일반 주식 / ETF";
  }

  // Compute Pearson Correlation between two stock series
  function computeStockPearsonCorrelation(stockA, stockB, dates) {
    const returnsA = [];
    const returnsB = [];

    const pricesA = dates.map(d => stockA.prices[d] || null);
    const pricesB = dates.map(d => stockB.prices[d] || null);

    for (let i = 1; i < dates.length; i++) {
      const pA0 = pricesA[i - 1];
      const pA1 = pricesA[i];
      const pB0 = pricesB[i - 1];
      const pB1 = pricesB[i];

      if (pA0 && pA1 && pB0 && pB1) {
        returnsA.push((pA1 - pA0) / pA0);
        returnsB.push((pB1 - pB0) / pB0);
      }
    }

    if (returnsA.length === 0) {
      return 0.0;
    }

    if (returnsA.length === 1) {
      const rA = returnsA[0];
      const rB = returnsB[0];

      if ((rA >= 0 && rB >= 0) || (rA <= 0 && rB <= 0)) {
        const maxVal = Math.max(Math.abs(rA), Math.abs(rB), 0.001);
        const diff = Math.abs(rA - rB) / maxVal;
        return parseFloat(Math.max(0.2, 1.0 - Math.min(0.8, diff)).toFixed(2));
      } else {
        const diff = Math.abs(rA - rB);
        return parseFloat((-0.5 - Math.min(0.4, diff * 2)).toFixed(2));
      }
    }

    const n = returnsA.length;
    const meanA = returnsA.reduce((sum, v) => sum + v, 0) / n;
    const meanB = returnsB.reduce((sum, v) => sum + v, 0) / n;

    let num = 0;
    let denA = 0;
    let denB = 0;

    for (let i = 0; i < n; i++) {
      const diffA = returnsA[i] - meanA;
      const diffB = returnsB[i] - meanB;
      num += diffA * diffB;
      denA += diffA * diffA;
      denB += diffB * diffB;
    }

    const den = Math.sqrt(denA * denB);
    if (den === 0) return 0.0;

    const r = Math.max(-1, Math.min(1, num / den));
    return parseFloat(r.toFixed(2));
  }

  // Render main stock analysis tab
  function renderStockAnalysisTab() {
    renderStockChipContainer();

    const emptyPrompt = document.getElementById('saEmptyPrompt');
    const chartWrapper = document.getElementById('saChartWrapper');

    if (!isGraphDrawn) {
      if (emptyPrompt) emptyPrompt.style.display = 'block';
      if (chartWrapper) chartWrapper.style.display = 'none';
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    if (emptyPrompt) emptyPrompt.style.display = 'none';
    if (chartWrapper) chartWrapper.style.display = 'block';

    const { stockMap, dates } = extractStockSeriesMap();
    const stockNames = Object.keys(stockMap).sort();

    // 1. Populate Focus Stock Select Dropdown
    const selectEl = document.getElementById('stockAnalysisSelect');
    if (selectEl) {
      const currVal = selectEl.value;
      selectEl.innerHTML = '';
      stockNames.forEach(name => {
        const opt = document.createElement('option');
        opt.value = name;
        opt.textContent = `${name} (${stockMap[name].theme})`;
        selectEl.appendChild(opt);
      });

      if (currVal && stockNames.includes(currVal)) {
        selectEl.value = currVal;
        selectedStockAnalysisName = currVal;
      } else {
        selectEl.value = stockNames[0] || '';
        selectedStockAnalysisName = stockNames[0] || '';
      }
    }

    // 2. Render Stock Legend Chips
    renderStockLegendChips(stockNames);

    // 3. Render Main Stock Analysis Chart & KPI
    renderStockAnalysisChart();

    // 4. Render Correlation Content
    renderStockCorrelationContent();

    if (window.lucide) window.lucide.createIcons();
  }

  // Render Legend Chips for Multi-Stock Trend Chart
  function renderStockLegendChips(stockNames) {
    const legendContainer = document.getElementById('saStockLegendContainer');
    if (!legendContainer) return;
    legendContainer.innerHTML = '';

    stockNames.forEach((name, idx) => {
      const color = stockColorPalette[idx % stockColorPalette.length];
      const isSelected = name === selectedStockAnalysisName;

      const chip = document.createElement('div');
      chip.className = `stock-legend-chip ${isSelected ? 'active' : ''}`;
      chip.innerHTML = `<span class="dot" style="background-color: ${color};"></span><span>${name}</span>`;

      chip.addEventListener('click', () => {
        selectedStockAnalysisName = name;
        const selectEl = document.getElementById('stockAnalysisSelect');
        if (selectEl) selectEl.value = name;
        renderStockLegendChips(stockNames);
        renderStockAnalysisChart();
      });

      legendContainer.appendChild(chip);
    });
  }

  // Render Individual & Multi-Stock vs Benchmarks Chart
  function renderStockAnalysisChart() {
    const selectEl = document.getElementById('stockAnalysisSelect');
    if (selectEl && selectEl.value) {
      selectedStockAnalysisName = selectEl.value;
    }

    const modeSelectEl = document.getElementById('stockChartModeSelect');
    if (modeSelectEl) {
      stockChartMode = modeSelectEl.value;
    }

    const chkSp500 = document.getElementById('chkSp500')?.checked ?? true;
    const chkKospi200 = document.getElementById('chkKospi200')?.checked ?? true;

    const { stockMap, dates } = extractStockSeriesMap();
    const stockNames = Object.keys(stockMap).sort();
    if (stockNames.length === 0) return;

    const stockData = stockMap[selectedStockAnalysisName] || stockMap[stockNames[0]];
    if (!stockData) return;

    const { sp500Prices, kospi200Prices } = getBenchmarkDataMap();

    // Update KPI Cards for Focus Stock
    const firstDate = dates[0];
    const latestDate = dates[dates.length - 1];

    let p0 = null;
    for (const d of dates) {
      if (stockData.prices[d] !== null && stockData.prices[d] !== undefined) {
        p0 = stockData.prices[d]; break;
      }
    }
    const pLatest = stockData.prices[latestDate];

    let stockReturnPct = 0;
    if (p0 && p0 > 0 && pLatest && pLatest > 0) {
      stockReturnPct = ((pLatest - p0) / p0) * 100;
    }

    let sp0 = null;
    for (const d of dates) { if (sp500Prices[d]) { sp0 = sp500Prices[d]; break; } }
    if (!sp0) sp0 = 5464.6;
    const spLatest = sp500Prices[latestDate] || 5626.0;
    const sp500ReturnPct = ((spLatest - sp0) / sp0) * 100;

    let kp0 = null;
    for (const d of dates) { if (kospi200Prices[d]) { kp0 = kospi200Prices[d]; break; } }
    if (!kp0) kp0 = 370.5;
    const kpLatest = kospi200Prices[latestDate] || 352.0;
    const kospi200ReturnPct = ((kpLatest - kp0) / kp0) * 100;

    const sp500Diff = stockReturnPct - sp500ReturnPct;
    const kospi200Diff = stockReturnPct - kospi200ReturnPct;

    const stockNameEl = document.getElementById('saKpiStockName');
    if (stockNameEl) stockNameEl.innerText = `${stockData.name} 기간 수익률`;

    const retValEl = document.getElementById('saKpiStockReturnVal');
    if (retValEl) {
      retValEl.innerText = formatPercent(stockReturnPct);
      retValEl.style.color = stockReturnPct >= 0 ? 'var(--profit-green)' : 'var(--loss-red)';
    }

    const spDiffEl = document.getElementById('saKpiSp500DiffVal');
    if (spDiffEl) {
      const sign = sp500Diff >= 0 ? '+' : '';
      spDiffEl.innerText = `${sign}${sp500Diff.toFixed(1)}%p`;
      spDiffEl.style.color = sp500Diff >= 0 ? '#f59e0b' : 'var(--loss-red)';
    }

    const kpDiffEl = document.getElementById('saKpiKospi200DiffVal');
    if (kpDiffEl) {
      const sign = kospi200Diff >= 0 ? '+' : '';
      kpDiffEl.innerText = `${sign}${kospi200Diff.toFixed(1)}%p`;
      kpDiffEl.style.color = kospi200Diff >= 0 ? '#10b981' : 'var(--loss-red)';
    }

    const themeValEl = document.getElementById('saKpiThemeVal');
    if (themeValEl) themeValEl.innerText = stockData.theme;

    // Chart Datasets for All Selected Stocks
    const canvasCtx = document.getElementById('stockAnalysisChart').getContext('2d');
    if (stockAnalysisChartInstance) stockAnalysisChartInstance.destroy();

    const chartDatasets = [];

    stockNames.forEach((sName, idx) => {
      const sData = stockMap[sName];
      const isFocus = sName === stockData.name;
      const color = stockColorPalette[idx % stockColorPalette.length];
      
      let basePrice = null;
      for (const d of dates) {
        if (sData.prices[d] !== null && sData.prices[d] !== undefined) {
          basePrice = sData.prices[d]; break;
        }
      }
      if (!basePrice) basePrice = 1;

      const seriesPoints = dates.map(d => {
        const price = sData.prices[d];
        if (price === null || price === undefined) return null;
        if (stockChartMode === 'actual') return price;
        return basePrice > 0 ? parseFloat((((price - basePrice) / basePrice) * 100).toFixed(2)) : 0;
      });

      chartDatasets.push({
        label: sName,
        data: seriesPoints,
        borderColor: color,
        backgroundColor: color + '22',
        borderWidth: isFocus ? 4 : 2,
        tension: 0.3,
        pointRadius: isFocus ? 6 : 4,
        fill: false
      });
    });

    // S&P 500 Line
    if (chkSp500) {
      const spData = dates.map(d => {
        const spP = sp500Prices[d] || (d === dates[0] ? sp0 : spLatest);
        if (stockChartMode === 'actual') return spP;
        return parseFloat((((spP - sp0) / sp0) * 100).toFixed(2));
      });

      chartDatasets.push({
        label: 'S&P 500 지수',
        data: spData,
        borderColor: '#f59e0b',
        borderDash: [5, 5],
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 4,
        fill: false
      });
    }

    // KOSPI 200 Line
    if (chkKospi200) {
      const kpData = dates.map(d => {
        const kpP = kospi200Prices[d] || (d === dates[0] ? kp0 : kpLatest);
        if (stockChartMode === 'actual') return kpP;
        return parseFloat((((kpP - kp0) / kp0) * 100).toFixed(2));
      });

      chartDatasets.push({
        label: 'KOSPI 200 지수',
        data: kpData,
        borderColor: '#10b981',
        borderDash: [3, 3],
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 4,
        fill: false
      });
    }

    // --- DUMMY TEST DATA (USER REQUESTED) ---
    chartDatasets.push({
      label: '더미 테스트 종목',
      data: dates.map((d, i) => stockChartMode === 'actual' ? 5000 + i * 1000 : i * 5),
      borderColor: '#ff00ff', // Bright magenta
      backgroundColor: 'rgba(255,0,255,0.2)',
      borderWidth: 4,
      tension: 0.1,
      pointRadius: 6,
      fill: false
    });
    // ----------------------------------------

    try {
      stockAnalysisChartInstance = new Chart(canvasCtx, {
        type: 'line',
        data: {
          labels: dates,
          datasets: chartDatasets
        },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function(ctx) {
                let label = ctx.dataset.label || '';
                if (label) label += ': ';
                label += ctx.parsed.y + (stockChartMode === 'actual' ? ' ₩' : '%');
                return label;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { maxTicksLimit: 12 }
          },
          y: {
            position: 'right',
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: {
              callback: function(value) {
                return value + (stockChartMode === 'actual' ? ' ₩' : '%');
              }
            }
          }
        }
      }
    }
  });
    } catch(err) {
      document.getElementById('saStockLegendChips').innerHTML += `<div style="color:var(--loss-red); font-weight:bold; padding:10px;">차트 렌더링 에러: ${err.message}</div>`;
      console.error(err);
    }
  }

  // Render Sub-View content for Correlation & Risk Diversification
  function renderStockCorrelationContent() {
    const subViewEl = document.getElementById('stockCorrelationSubView');
    if (!subViewEl) return;

    const { stockMap, dates } = extractStockSeriesMap();
    const stockNames = Object.keys(stockMap).sort();

    // Compute all pairwise correlation pairs
    const pairs = [];
    for (let i = 0; i < stockNames.length; i++) {
      for (let j = i + 1; j < stockNames.length; j++) {
        const nameA = stockNames[i];
        const nameB = stockNames[j];
        const r = computeStockPearsonCorrelation(stockMap[nameA], stockMap[nameB], dates);
        pairs.push({
          stockA: stockMap[nameA],
          stockB: stockMap[nameB],
          r: r
        });
      }
    }

    if (activeCorrSubTab === 'high_similarity') {
      const highPairs = pairs.filter(p => p.r >= 0.6).sort((a, b) => b.r - a.r);
      if (highPairs.length === 0) {
        subViewEl.innerHTML = `
          <div style="text-align: center; color: var(--text-muted); padding: 36px 20px;">
            <i data-lucide="info" style="width: 32px; height: 32px; color: var(--accent-cyan); margin-bottom: 8px;"></i>
            <p>상관계수 r ≥ 0.6 이상의 고동조성 종목 쌍이 발견되지 않았습니다. 포트폴리오 변동이 유연하게 분산되어 있습니다.</p>
          </div>
        `;
      } else {
        let cardsHtml = '<div class="corr-grid">';
        highPairs.forEach(p => {
          const sameTheme = p.stockA.theme === p.stockB.theme ? p.stockA.theme : null;
          cardsHtml += `
            <div class="corr-card high-risk">
              <div class="corr-card-header">
                <div>
                  <div class="corr-stock-name">${p.stockA.name} <span style="color: var(--text-muted); font-size: 13px;">vs</span> ${p.stockB.name}</div>
                  <div style="margin-top: 4px;">
                    <span class="theme-tag">${p.stockA.theme}</span>
                    <span class="theme-tag">${p.stockB.theme}</span>
                  </div>
                </div>
                <div class="corr-badge high">r = +${p.r.toFixed(2)}</div>
              </div>
              <p style="font-size: 12px; color: #fca5a5; margin-top: 8px; line-height: 1.4;">
                ⚠️ <strong>동조 변동 리스크:</strong> 두 종목의 주가 움직임이 매우 비슷합니다. ${sameTheme ? `(${sameTheme} 테마 중복)` : ''} 리스크 관리를 위해 포트폴리오 비중을 점검하세요.
              </p>
            </div>
          `;
        });
        cardsHtml += '</div>';
        subViewEl.innerHTML = cardsHtml;
      }

    } else if (activeCorrSubTab === 'hedge_diversity') {
      const hedgePairs = pairs.filter(p => p.r <= 0.2).sort((a, b) => a.r - b.r);
      if (hedgePairs.length === 0) {
        subViewEl.innerHTML = `
          <div style="text-align: center; color: var(--text-muted); padding: 36px 20px;">
            <i data-lucide="shield" style="width: 32px; height: 32px; color: var(--accent-cyan); margin-bottom: 8px;"></i>
            <p>음의 상관관계를 갖는 헷지 종목 쌍이 아직 감지되지 않았습니다.</p>
          </div>
        `;
      } else {
        let cardsHtml = '<div class="corr-grid">';
        hedgePairs.forEach(p => {
          const isNegative = p.r < 0;
          cardsHtml += `
            <div class="corr-card hedge-benefit">
              <div class="corr-card-header">
                <div>
                  <div class="corr-stock-name">${p.stockA.name} <span style="color: var(--text-muted); font-size: 13px;">vs</span> ${p.stockB.name}</div>
                  <div style="margin-top: 4px;">
                    <span class="theme-tag">${p.stockA.theme}</span>
                    <span class="theme-tag">${p.stockB.theme}</span>
                  </div>
                </div>
                <div class="corr-badge ${isNegative ? 'hedge' : 'neutral'}">r = ${p.r >= 0 ? '+' : ''}${p.r.toFixed(2)}</div>
              </div>
              <p style="font-size: 12px; color: #6ee7b7; margin-top: 8px; line-height: 1.4;">
                🛡️ <strong>자산 분산 효과:</strong> 두 종목 간의 변동성이 독립적이거나 상쇄되어 하락장에서 전체 계좌 리스크를 완화시켜 줍니다.
              </p>
            </div>
          `;
        });
        cardsHtml += '</div>';
        subViewEl.innerHTML = cardsHtml;
      }

    } else if (activeCorrSubTab === 'heatmap') {
      const topStocks = stockNames
        .map(name => ({
          name,
          eval: stockMap[name].evals[dates[dates.length - 1]] || 0
        }))
        .sort((a, b) => b.eval - a.eval)
        .slice(0, 10)
        .map(s => s.name);

      let tableHtml = `
        <div class="heatmap-wrapper">
          <table class="heatmap-table">
            <thead>
              <tr>
                <th>종목명</th>
                ${topStocks.map(s => `<th title="${s}">${s.length > 8 ? s.substring(0, 8) + '...' : s}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
      `;

      topStocks.forEach(nameA => {
        tableHtml += `<tr><td class="header-col">${nameA}</td>`;
        topStocks.forEach(nameB => {
          if (nameA === nameB) {
            tableHtml += `<td><div class="cell-r r-self">1.00</div></td>`;
          } else {
            const r = computeStockPearsonCorrelation(stockMap[nameA], stockMap[nameB], dates);
            let cellClass = 'r-neutral';
            if (r >= 0.7) cellClass = 'r-high';
            else if (r >= 0.3) cellClass = 'r-mod';
            else if (r <= -0.1) cellClass = 'r-hedge';

            tableHtml += `<td><div class="cell-r ${cellClass}">${r >= 0 ? '+' : ''}${r.toFixed(2)}</div></td>`;
          }
        });
        tableHtml += `</tr>`;
      });

      tableHtml += `
            </tbody>
          </table>
        </div>
      `;
      subViewEl.innerHTML = tableHtml;

    } else if (activeCorrSubTab === 'custom_duo') {
      if (!duoSelectedStockA || !stockNames.includes(duoSelectedStockA)) {
        duoSelectedStockA = stockNames[0] || "";
      }
      if (!duoSelectedStockB || !stockNames.includes(duoSelectedStockB)) {
        duoSelectedStockB = stockNames[1] || stockNames[0] || "";
      }

      let duoHtml = `
        <div style="margin-top: 8px;">
          <div style="display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 16px; align-items: center; background: rgba(0,0,0,0.3); padding: 12px 16px; border-radius: var(--radius-md); border: 1px solid var(--border-card);">
            <div style="display: flex; align-items: center; gap: 8px;">
              <label style="font-size: 13px; font-weight: 600; color: #6366f1;">종목 A:</label>
              <select class="select-filter" id="duoStockASelect">
                ${stockNames.map(name => `<option value="${name}" ${name === duoSelectedStockA ? 'selected' : ''}>${name}</option>`).join('')}
              </select>
            </div>

            <div style="display: flex; align-items: center; gap: 8px;">
              <label style="font-size: 13px; font-weight: 600; color: #06b6d4;">종목 B:</label>
              <select class="select-filter" id="duoStockBSelect">
                ${stockNames.map(name => `<option value="${name}" ${name === duoSelectedStockB ? 'selected' : ''}>${name}</option>`).join('')}
              </select>
            </div>

            <div id="duoCorrBadge" style="margin-left: auto;">
              <!-- Rendered by renderDuoComparisonChart -->
            </div>
          </div>

          <div class="chart-container" style="height: 320px;">
            <canvas id="duoComparisonChart"></canvas>
          </div>
        </div>
      `;
      subViewEl.innerHTML = duoHtml;

      const selA = document.getElementById('duoStockASelect');
      const selB = document.getElementById('duoStockBSelect');

      if (selA) {
        selA.addEventListener('change', (e) => {
          duoSelectedStockA = e.target.value;
          renderDuoComparisonChart();
        });
      }
      if (selB) {
        selB.addEventListener('change', (e) => {
          duoSelectedStockB = e.target.value;
          renderDuoComparisonChart();
        });
      }

      renderDuoComparisonChart();
    }

    if (window.lucide) window.lucide.createIcons();
  }

  // Render 1:1 Duo Comparison Chart
  function renderDuoComparisonChart() {
    const canvasEl = document.getElementById('duoComparisonChart');
    if (!canvasEl) return;

    const { stockMap, dates } = extractStockSeriesMap();
    const stockA = stockMap[duoSelectedStockA];
    const stockB = stockMap[duoSelectedStockB];

    if (!stockA || !stockB) return;

    const r = computeStockPearsonCorrelation(stockA, stockB, dates);

    const badgeEl = document.getElementById('duoCorrBadge');
    if (badgeEl) {
      let badgeClass = 'neutral';
      let labelText = '독립적 변동';
      if (r >= 0.7) { badgeClass = 'high'; labelText = '높은 동조성 (리스크 중복)'; }
      else if (r <= -0.1) { badgeClass = 'hedge'; labelText = '헷지 & 분산 효과'; }

      badgeEl.innerHTML = `<span class="corr-badge ${badgeClass}">피어슨 상관계수 r = ${r >= 0 ? '+' : ''}${r.toFixed(2)} (${labelText})</span>`;
    }

    const firstDate = dates[0];
    const pA0 = stockA.prices[firstDate] || 1;
    const pB0 = stockB.prices[firstDate] || 1;

    const dataA = dates.map(d => {
      const price = stockA.prices[d];
      if (!price) return null;
      return parseFloat((((price - pA0) / pA0) * 100).toFixed(2));
    });

    const dataB = dates.map(d => {
      const price = stockB.prices[d];
      if (!price) return null;
      return parseFloat((((price - pB0) / pB0) * 100).toFixed(2));
    });

    const ctx = canvasEl.getContext('2d');
    if (duoChartInstance) duoChartInstance.destroy();

    duoChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [
          {
            label: stockA.name,
            data: dataA,
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            borderWidth: 3,
            tension: 0.3,
            pointRadius: 5
          },
          {
            label: stockB.name,
            data: dataB,
            borderColor: '#06b6d4',
            backgroundColor: 'rgba(6, 182, 212, 0.1)',
            borderWidth: 3,
            tension: 0.3,
            pointRadius: 5
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: {
            position: 'top',
            labels: { color: '#9ca3af', font: { family: 'Outfit', size: 12, weight: 600 } }
          },
          tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            titleColor: '#ffffff',
            bodyColor: '#cbd5e1',
            callbacks: {
              label: function(c) {
                return `${c.dataset.label}: ${c.raw >= 0 ? '+' : ''}${c.raw}%`;
              }
            }
          }
        },
        scales: {
          x: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#9ca3af' } },
          y: {
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: { color: '#9ca3af', callback: v => `${v}%` }
          }
        }
      }
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

    // Stock Analysis Control Listeners
    const saYearSel = document.getElementById('saStartYearSelect');
    if (saYearSel) saYearSel.addEventListener('change', renderStockAnalysisTab);

    const saMonthSel = document.getElementById('saStartMonthSelect');
    if (saMonthSel) saMonthSel.addEventListener('change', renderStockAnalysisTab);

    document.querySelectorAll('input[name="saIntervalType"]').forEach(rad => {
      rad.addEventListener('change', renderStockAnalysisTab);
    });

    const btnSelectAll = document.getElementById('btnSaSelectAll');
    if (btnSelectAll) {
      btnSelectAll.addEventListener('click', () => {
        const allStocks = getAllHeldStockNames();
        saSelectedStockNamesSet = new Set(allStocks.map(s => s.name));
        renderStockAnalysisTab();
      });
    }

    const btnDeselectAll = document.getElementById('btnSaDeselectAll');
    if (btnDeselectAll) {
      btnDeselectAll.addEventListener('click', () => {
        saSelectedStockNamesSet = new Set();
        renderStockAnalysisTab();
      });
    }

    const saSelect = document.getElementById('stockAnalysisSelect');
    if (saSelect) saSelect.addEventListener('change', renderStockAnalysisChart);

    const saMode = document.getElementById('stockChartModeSelect');
    if (saMode) saMode.addEventListener('change', renderStockAnalysisChart);

    const chkSp = document.getElementById('chkSp500');
    if (chkSp) chkSp.addEventListener('change', renderStockAnalysisChart);

    const chkKp = document.getElementById('chkKospi200');
    if (chkKp) chkKp.addEventListener('change', renderStockAnalysisChart);

    const btnSync = document.getElementById('btnSyncAndDraw');
    if (btnSync) btnSync.addEventListener('click', handleSyncAndDraw);

    // Refresh Holdings & Ticker Match Button Handlers
    const btnRefreshStocks = document.getElementById('btnSaRefreshStocks');
    if (btnRefreshStocks) btnRefreshStocks.addEventListener('click', handleRefreshStocks);

    const btnRefreshStocksHeader = document.getElementById('btnSaRefreshStocksHeader');
    if (btnRefreshStocksHeader) btnRefreshStocksHeader.addEventListener('click', handleRefreshStocks);


    // Correlation Sub-Tab buttons
    document.querySelectorAll('.corr-subtab').forEach(btn => {
      btn.addEventListener('click', () => {
        activeCorrSubTab = btn.dataset.subtab;
        document.querySelectorAll('.corr-subtab').forEach(b => b.classList.toggle('active', b.dataset.subtab === activeCorrSubTab));
        renderStockCorrelationContent();
      });
    });

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

    // ==========================================
    // System Settings & Auth Events
    // ==========================================
    const settingsModal = document.getElementById('settingsModal');
    const btnOpenSettings = document.getElementById('btnOpenSettings');
    const closeSettingsModalBtn = document.getElementById('closeSettingsModalBtn');
    const btnSavePassword = document.getElementById('btnSavePassword');
    const btnRemovePassword = document.getElementById('btnRemovePassword');
    const btnResetDatabase = document.getElementById('btnResetDatabase');

    function refreshSettingsUI() {
      const savedPwd = localStorage.getItem('js_app_password');
      const badge = document.getElementById('pwdStatusBadge');
      const currentPwdGroup = document.getElementById('currentPwdGroup');
      const btnRemove = document.getElementById('btnRemovePassword');
      const btnSave = document.getElementById('btnSavePassword');

      if (savedPwd) {
        if (badge) {
          badge.textContent = '보안 설정됨';
          badge.className = 'badge-status active';
        }
        if (currentPwdGroup) currentPwdGroup.style.display = 'block';
        if (btnRemove) btnRemove.style.display = 'inline-flex';
        if (btnSave) btnSave.innerHTML = '<i data-lucide="shield-check" style="width: 15px; height: 15px;"></i> Password 재설정';
      } else {
        if (badge) {
          badge.textContent = '미설정 (자유 접속)';
          badge.className = 'badge-status';
        }
        if (currentPwdGroup) currentPwdGroup.style.display = 'none';
        if (btnRemove) btnRemove.style.display = 'none';
        if (btnSave) btnSave.innerHTML = '<i data-lucide="shield-check" style="width: 15px; height: 15px;"></i> Password 설정/저장';
      }

      const curInput = document.getElementById('currentPasswordInput');
      const newInput = document.getElementById('newPasswordInput');
      const confirmInput = document.getElementById('confirmPasswordInput');
      if (curInput) curInput.value = '';
      if (newInput) newInput.value = '';
      if (confirmInput) confirmInput.value = '';

      if (window.lucide) window.lucide.createIcons();
    }

    if (btnOpenSettings && settingsModal) {
      btnOpenSettings.addEventListener('click', () => {
        refreshSettingsUI();
        settingsModal.classList.add('active');
      });
    }

    if (closeSettingsModalBtn && settingsModal) {
      closeSettingsModalBtn.addEventListener('click', () => {
        settingsModal.classList.remove('active');
      });
    }

    // Close modals on clicking overlay background
    window.addEventListener('click', (e) => {
      if (e.target === settingsModal) settingsModal.classList.remove('active');
      if (e.target === modal) modal.classList.remove('active');
    });

    // Password Save / Reset Button
    if (btnSavePassword) {
      btnSavePassword.addEventListener('click', () => {
        const savedPwd = localStorage.getItem('js_app_password');
        const curInput = document.getElementById('currentPasswordInput');
        const newInput = document.getElementById('newPasswordInput');
        const confirmInput = document.getElementById('confirmPasswordInput');

        if (savedPwd) {
          if (!curInput || curInput.value !== savedPwd) {
            alert('현재 비밀번호가 일치하지 않습니다.');
            if (curInput) curInput.focus();
            return;
          }
        }

        const newPwd = (newInput ? newInput.value : '').trim();
        const confPwd = (confirmInput ? confirmInput.value : '').trim();

        if (newPwd.length < 4) {
          alert('새 비밀번호를 4자리 이상 입력해주세요.');
          if (newInput) newInput.focus();
          return;
        }

        if (newPwd !== confPwd) {
          alert('새 비밀번호와 확인 입력이 일치하지 않습니다.');
          if (confirmInput) confirmInput.focus();
          return;
        }

        localStorage.setItem('js_app_password', newPwd);
        alert('비밀번호가 성공적으로 저장/재설정되었습니다.');
        refreshSettingsUI();
      });
    }

    // Password Remove Button
    if (btnRemovePassword) {
      btnRemovePassword.addEventListener('click', () => {
        const savedPwd = localStorage.getItem('js_app_password');
        const curInput = document.getElementById('currentPasswordInput');
        if (savedPwd && curInput) {
          if (curInput.value !== savedPwd) {
            alert('현재 비밀번호를 올바르게 입력해야 해제가 가능합니다.');
            curInput.focus();
            return;
          }
        }
        if (confirm('비밀번호 보호 설정을 해제하시겠습니까?')) {
          localStorage.removeItem('js_app_password');
          alert('비밀번호 보호 설정이 해제되었습니다.');
          refreshSettingsUI();
        }
      }
    }
  });
    }

    // DB Reset Button (Complete Wipe to 0 records)
    if (btnResetDatabase) {
      btnResetDatabase.addEventListener('click', async () => {
        const ok = confirm('정말로 모든 데이터를 완전 삭제(초기화)하시겠습니까?\n\n- 프로그램에 로드된 모든 스냅샷이 0건으로 비워집니다.\n- 새 엑셀 파일(spop_*.xlsx)을 업로드하여 데이터를 추가할 수 있습니다.');
        if (ok) {
          localStorage.removeItem('js_investment_custom');
          localStorage.setItem('js_db_cleared', 'true');
          if (settingsModal) settingsModal.classList.remove('active');
          await initData();
          alert('모든 데이터가 삭제되고 0건의 빈 상태로 초기화되었습니다.\n엑셀 파일을 업로드하여 새로운 데이터를 분석해보세요!');
        }
      }
    }
  });
    }

    // Restore Demo Data Button
    const btnRestoreDemo = document.getElementById('btnRestoreDemoData');
    if (btnRestoreDemo) {
      btnRestoreDemo.addEventListener('click', async () => {
        if (confirm('기본 예제 데이터(spop_db 샘플)를 다시 불러오시겠습니까?')) {
          localStorage.removeItem('js_db_cleared');
          if (settingsModal) settingsModal.classList.remove('active');
          await initData(true);
          alert('기본 예제 데이터가 성공적으로 복원되었습니다.');
        }
      }
    }
  });
    }

    // App Lock Overlay Logic
    const lockOverlay = document.getElementById('appLockOverlay');
    const lockInput = document.getElementById('lockPasswordInput');
    const btnUnlock = document.getElementById('btnUnlockApp');
    const lockErrorMsg = document.getElementById('lockErrorMsg');

    function checkAppLock() {
      const savedPwd = localStorage.getItem('js_app_password');
      if (savedPwd && lockOverlay) {
        lockOverlay.style.display = 'flex';
        if (lockInput) {
          lockInput.value = '';
          setTimeout(() => lockInput.focus(), 100);
        }
      } else if (lockOverlay) {
        lockOverlay.style.display = 'none';
      }
    }

    function attemptUnlock() {
      const savedPwd = localStorage.getItem('js_app_password');
      if (!savedPwd) {
        if (lockOverlay) lockOverlay.style.display = 'none';
        return;
      }
      if (lockInput && lockInput.value === savedPwd) {
        if (lockOverlay) lockOverlay.style.display = 'none';
        if (lockErrorMsg) lockErrorMsg.style.display = 'none';
      } else {
        if (lockErrorMsg) {
          lockErrorMsg.style.display = 'block';
          lockErrorMsg.textContent = '비밀번호가 일치하지 않습니다.';
        }
        if (lockInput) {
          lockInput.value = '';
          lockInput.focus();
        }
      }
    }

    if (btnUnlock) btnUnlock.addEventListener('click', attemptUnlock);
    if (lockInput) {
      lockInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          attemptUnlock();
        }
      }
    }
  });
    }

    checkAppLock();
  }

  function handleExcelFile(file) {
    const reader = new FileReader();
    reader.onload = async function(e) {
      try {
        const newDataset = parseSpopArrayBuffer(e.target.result, file.name);
        if (!newDataset || newDataset.items.length === 0) {
          alert('엑셀 파일에서 보유 종목 데이터를 읽을 수 없습니다.');
          return;
        }

        // Remove cleared flag upon uploading new file
        localStorage.removeItem('js_db_cleared');

        // Remove from deleted blacklist if previously deleted
        const deletedDatesJson = localStorage.getItem('js_deleted_snapshots');
        if (deletedDatesJson) {
          try {
            const deletedDates = JSON.parse(deletedDatesJson);
            const filtered = deletedDates.filter(d => d !== newDataset.date);
            localStorage.setItem('js_deleted_snapshots', JSON.stringify(filtered));
          } catch(e) {}
        }

        const existingIdx = rawDatasets.findIndex(d => d.date === newDataset.date);
        if (existingIdx >= 0) {
          rawDatasets[existingIdx] = newDataset;
          selectedSnapshotIndex = existingIdx;
        } else {
          rawDatasets.push(newDataset);
          rawDatasets.sort((a, b) => new Date(a.date) - new Date(b.date));
          selectedSnapshotIndex = rawDatasets.findIndex(d => d.date === newDataset.date);
        }

        const customOnly = rawDatasets.filter(d => d.date !== '2026-06-28' && d.date !== '2026-09-12');
        localStorage.setItem('js_investment_custom', JSON.stringify(customOnly));

        const modal = document.getElementById('uploadModal');
        if (modal) modal.classList.remove('active');
        alert(`${newDataset.date} 스냅샷 데이터가 성공적으로 추가되었습니다!`);

        renderDateButtons();
        renderDashboard();
      } catch (err) {
        console.error(err);
        alert(err.message || '엑셀 파일을 파싱하는 도중 오류가 발생했습니다.');
      }
    };
    reader.readAsArrayBuffer(file);
  }

  document.addEventListener('DOMContentLoaded', () => {
    try {
      setupEvents();
    } catch(e) {
      console.error('Failed to setup events:', e);
    }
    try {
      initData();
    } catch(e) {
      console.error('Failed to init data:', e);
    }
  });

})();



