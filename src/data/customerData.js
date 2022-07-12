const customerData = [
  {
    "CustomerGroup": "3000-A001",
    "Name": "A.C KIDS PTE LTD ",
    "Address": "258 PASIR RIS ST.21,#01-03",
    "Postal": "",
    "SalesAgent": "IVY"
  },
  {
    "CustomerGroup": "3000-A002",
    "Name": "ALIKHAN LIVE ENTERTAINMENT PTE LTD",
    "Address": "625 TOA PAYOH LORONG 4",
    "Postal": "",
    "SalesAgent": "DON"
  },
  {
    "CustomerGroup": "3000-A003",
    "Name": "AMAZON ASIA-PACIFIC HOLDINGS PRIVATE LIMITED",
    "Address": "1 ROBINSON ROAD",
    "Postal": "",
    "SalesAgent": "COMPANY"
  },
  {
    "CustomerGroup": "3000-A004",
    "Name": "ARTBOX PTE LTD",
    "Address": "26 SIN MING LANE, #03-111",
    "Postal": "",
    "SalesAgent": "DON"
  },
  {
    "CustomerGroup": "3000-B001",
    "Name": "B.N.G GARMENT STORE",
    "Address": "BLK 539 BEDOK NORTH ST 3",
    "Postal": "",
    "SalesAgent": "IVY"
  },
  {
    "CustomerGroup": "3000-B002",
    "Name": "BABY'S BOUTIQUE",
    "Address": "BLK 821 TAMPINES ST 81, #01-218",
    "Postal": "",
    "SalesAgent": "IVY"
  },
  {
    "CustomerGroup": "3000-B003",
    "Name": "BAKEMONO PTE LTD ",
    "Address": "1002 JALAN BUKIT MERAH #03-06 ",
    "Postal": "",
    "SalesAgent": "DON"
  },
  {
    "CustomerGroup": "3000-B004",
    "Name": "BASIC POINT PTE LTD",
    "Address": "BEDOK, BLK 122 BEDOK NORTH ST 2",
    "Postal": "",
    "SalesAgent": "IVY"
  },
  {
    "CustomerGroup": "3000-B005",
    "Name": "BHG (SINGAPORE) PTE LTD",
    "Address": "73 BUKIT TIMAH ROAD, ",
    "Postal": "",
    "SalesAgent": "SAADIAH"
  },
  {
    "CustomerGroup": "3000-B006",
    "Name": "BLACKBEAN IDEAS PTE LTD ",
    "Address": "73 UBI ROAD 1, OXLEY BIZHUB ",
    "Postal": "",
    "SalesAgent": "DON"
  },
  {
    "CustomerGroup": "3000-C001",
    "Name": "C.K. TANG LIMITED ",
    "Address": "310 ORCHARD ROAD, ",
    "Postal": "",
    "SalesAgent": "SAADIAH"
  },
  {
    "CustomerGroup": "3000-C002",
    "Name": "CHANGI AIRPORT GROUP (S) PTE LTD ",
    "Address": "PO BOX 168 SINGAPORE CHANGI AIRPORT",
    "Postal": "",
    "SalesAgent": "DON"
  },
  {
    "CustomerGroup": "3000-C003",
    "Name": "CHEERS HOLDINGS (2004) PTE LTD ",
    "Address": "NO.1 JOO KOON CIRCLE #13-01",
    "Postal": "",
    "SalesAgent": "IVY"
  },
  {
    "CustomerGroup": "3000-C004",
    "Name": "CITY PLAZA",
    "Address": "#01-82, 810 Geylang Rd",
    "Postal": "",
    "SalesAgent": "IVY"
  },
  {
    "CustomerGroup": "3000-C005",
    "Name": "CLICK! LICENSING ASIA, INC (OVERSEA)",
    "Address": "UNIT 1902 JOLLIBEE PLAZA EMERALD AVENUE,",
    "Postal": "",
    "SalesAgent": "COMPANY"
  },
  {
    "CustomerGroup": "3000-C006",
    "Name": "CUBE SPROUT - HOUGANG 1 ",
    "Address": "1 HOUGANG STREET 91, #01-34",
    "Postal": "",
    "SalesAgent": "IVY"
  },
  {
    "CustomerGroup": "3000-C007",
    "Name": "CUBE SPROUT - SERAGOON",
    "Address": "53 SERAGOON NORTH AVE 4, #03-06,",
    "Postal": "",
    "SalesAgent": "IVY"
  },
  {
    "CustomerGroup": "3000-C008",
    "Name": "CUBE SPROUT- OUR TAMPINES HUB",
    "Address": "51 TAMPINES AVE 4 #B1-32 ",
    "Postal": "",
    "SalesAgent": "IVY"
  },
  {
    "CustomerGroup": "3000-C009",
    "Name": "CUBE SPROUT - WHITESANDS",
    "Address": "1 PASIR RIS CENTRAL STREET 3, #03-09",
    "Postal": "",
    "SalesAgent": "IVY"
  },
  {
    "CustomerGroup": "3000-C010",
    "Name": "CUBE-1 PRIVATE LIMITED",
    "Address": "BLK 255 COMPASSVALE ROAD ,#05-690",
    "Postal": "",
    "SalesAgent": "IVY"
  },
  {
    "CustomerGroup": "3000-E001",
    "Name": "EDUFARM LEARNING CENTRE ",
    "Address": "BLK 18, TRADEHUB 21 BOON LAY WAY",
    "Postal": "",
    "SalesAgent": "DON"
  },
  {
    "CustomerGroup": "3000-E002",
    "Name": "ELM TREE DISTRIBUTORS PTE LTD",
    "Address": "290 ORCHARD ROAD,#05-31A PARAGON ",
    "Postal": "",
    "SalesAgent": "SAADIAH"
  },
  {
    "CustomerGroup": "3000-E003",
    "Name": "ELM TREE HEAD OFFICE / WAREHOUSE",
    "Address": "625 ALJUNIED ROAD,#06-09 #06-06/08",
    "Postal": "",
    "SalesAgent": "SAADIAH"
  },
  {
    "CustomerGroup": "3000-E004",
    "Name": "EMWAY SINGAPORE PTE LTD",
    "Address": "7 PENJURU CLOSE, #03-00 SOON HOCK",
    "Postal": "",
    "SalesAgent": "COMPANY"
  },
  {
    "CustomerGroup": "3000-E005",
    "Name": "ENCHANTE SG ",
    "Address": "37 SEMBAWANG HILLS DRIVE",
    "Postal": "",
    "SalesAgent": "DON"
  },
  {
    "CustomerGroup": "3000-F001",
    "Name": "FOCAL PRINT N PACK PTE LTD",
    "Address": "47, KALLANG PUDDING ROAD,",
    "Postal": "",
    "SalesAgent": "DON"
  },
  {
    "CustomerGroup": "3000-F002",
    "Name": "FORWARD CREATION PTE LTD",
    "Address": "160 ROBINSON ROAD,#26-04 SBF CENTRE",
    "Postal": "",
    "SalesAgent": "DON"
  },
  {
    "CustomerGroup": "3000-F003",
    "Name": "FUNG KIDS (SINGAPORE) PTE LTD",
    "Address": "315 OUTRAM ROAD #14-10 ,TAN BOON LIAT",
    "Postal": "",
    "SalesAgent": "SAADIAH"
  },
  {
    "CustomerGroup": "3000-F004",
    "Name": "FRASERS PROPERTY MANAGEMENT SERVICES PTE LTD",
    "Address": "438 ,ALEXANDRA ROAD #21-00",
    "Postal": "",
    "SalesAgent": "DON"
  },
  {
    "CustomerGroup": "3000-G001",
    "Name": "GIANT HYPERMARKET",
    "Address": "21 TAMPINES NORTH DRIVE 2",
    "Postal": "",
    "SalesAgent": "SAADIAH"
  },
  {
    "CustomerGroup": "3000-G002",
    "Name": "GIFTS GREETINGS PTE LTD",
    "Address": "1 KIM SENG PROMENADE, #02-37,",
    "Postal": "",
    "SalesAgent": "SAADIAH"
  },
  {
    "CustomerGroup": "3000-G003",
    "Name": "GOLDWOOD TRADING PTE. LTD.",
    "Address": "103 KALLANG  AVENUE #03-02",
    "Postal": "",
    "SalesAgent": "IVY"
  },
  {
    "CustomerGroup": "3000-G004",
    "Name": "GRASSLAND BOOK STORE",
    "Address": "144 UPPER BT TIMAH ROAD, #B1-20/21",
    "Postal": "",
    "SalesAgent": "SAADIAH"
  },
  {
    "CustomerGroup": "3000-G005",
    "Name": "GROW-TEC MARKETING ENTERPRISE (OVERSEA) - USD",
    "Address": "BLK A UNIT 15-16 BANGUNAN BELAKANG",
    "Postal": "",
    "SalesAgent": "DON"
  },
  {
    "CustomerGroup": "3000-G006",
    "Name": "GROW-TEC MARKETING ENTERPRISE (OVERSEA) - SGD",
    "Address": "BLK A UNIT 15-16 BANGUNAN BELAKANG",
    "Postal": "",
    "SalesAgent": "DON"
  },
  {
    "CustomerGroup": "3000-H001",
    "Name": "HAO MART PTE LTD ",
    "Address": "25 CHANGI SOUTH STREET 1",
    "Postal": "",
    "SalesAgent": "LAYTIN"
  },
  {
    "CustomerGroup": "3000-H002",
    "Name": "HOME BOX OFFICE (SINGAPORE) PTE LTD ",
    "Address": "1 FUSIONOPOLIS WALK",
    "Postal": "",
    "SalesAgent": "DON"
  },
  {
    "CustomerGroup": "3000-I001",
    "Name": "ION9",
    "Address": "BLK 3011 BEDOK INDUSTRIAL PARK E ,",
    "Postal": "",
    "SalesAgent": "IVY"
  },
  {
    "CustomerGroup": "3000-I002",
    "Name": "ISETAN (S) LIMITED",
    "Address": "593 HAVELOCK ROAD #04-01",
    "Postal": "",
    "SalesAgent": "SAADIAH"
  },
  {
    "CustomerGroup": "3000-J001",
    "Name": "JIA JIE BEDOK",
    "Address": "BLK 632 BEDOK RESERVOIR ROAD",
    "Postal": "",
    "SalesAgent": "IVY"
  },
  {
    "CustomerGroup": "3000-J002",
    "Name": "JIA JIE TRADING",
    "Address": "BEDOK, BLK 632 BEDOK RESERVOIR ROAD",
    "Postal": "",
    "SalesAgent": "IVY"
  },
  {
    "CustomerGroup": "3000-J003",
    "Name": "JIA JIE WOODLAND",
    "Address": "BLK768 WOODLAND MART ",
    "Postal": "",
    "SalesAgent": "XIAO YEN"
  },
  {
    "CustomerGroup": "3000-J004",
    "Name": "JILYN PTE LTD",
    "Address": "530 LORONG 6 TOA PAYOH ",
    "Postal": "",
    "SalesAgent": "IVY"
  },
  {
    "CustomerGroup": "3000-J005",
    "Name": "JIN TAI GROUP PTE LTD",
    "Address": "10 UBI CRESCENT, UBI TECHPARK",
    "Postal": "",
    "SalesAgent": "DON"
  },
  {
    "CustomerGroup": "3000-J006",
    "Name": "JURONG BIRD PARK",
    "Address": "2 JURONG HILL",
    "Postal": "",
    "SalesAgent": "DON"
  },
  {
    "CustomerGroup": "3000-K001",
    "Name": "KIDDY PALACE PTE LTD",
    "Address": "43 KIM CHUAN DRIVE ",
    "Postal": "",
    "SalesAgent": "SAADIAH"
  },
  {
    "CustomerGroup": "3000-K002",
    "Name": "KLOSH PTE LTD",
    "Address": "26 SIN MING LANE ",
    "Postal": "573971",
    "SalesAgent": "DON"
  },
  {
    "CustomerGroup": "3000-L001",
    "Name": "LINE STATIONERY GIFTS & TOYS (PASIR RIS)",
    "Address": "BLK 735 PASIR RIS ST 72 ",
    "Postal": "",
    "SalesAgent": "IVY"
  },
  {
    "CustomerGroup": "3000-L002",
    "Name": "LINE STATIONERY GIFTS & TOYS (WISTERIA)",
    "Address": "THE WISTERIA, YISHUN AVENUE 4",
    "Postal": "",
    "SalesAgent": "XIAO YEN"
  },
  {
    "CustomerGroup": "3000-M001",
    "Name": "MOUNT FABER LEISURE GROUP PTE LTD ",
    "Address": "109 MOUNT FABER ROAD ",
    "Postal": "",
    "SalesAgent": "DON"
  },
  {
    "CustomerGroup": "3000-M002",
    "Name": "MACGICIAN DISTRIBUTION (DIRECT SHIPMENT)",
    "Address": "NO. 13 JALAN PERSIARAN KIP 1,",
    "Postal": "",
    "SalesAgent": "COMPANY"
  },
  {
    "CustomerGroup": "3000-M003",
    "Name": "MACGICIAN DISTRIBUTION SDN BHD",
    "Address": "13 JALAN PERSIARAN KIP 1, TAMAN",
    "Postal": "",
    "SalesAgent": "COMPANY"
  },
  {
    "CustomerGroup": "3000-M004",
    "Name": "MAHAKARUNA BUDDHIST SOCIETY",
    "Address": "4 KIM KEAT CLOSE, SINGAPORE 328916",
    "Postal": "",
    "SalesAgent": "COMPANY"
  },
  {
    "CustomerGroup": "3000-M005",
    "Name": "MATTEL SOUTHEAST ASIA PTE LTD (OVERSEA)",
    "Address": "LEVEL 2, PLOT 200,",
    "Postal": "",
    "SalesAgent": "COMPANY"
  },
  {
    "CustomerGroup": "3000-M006",
    "Name": "MOHAMED MUSTAFA & SAMSUDDIN CO PTE LTD",
    "Address": "MUSTAFA CENTRE 145,SYED ALWI RAOD,",
    "Postal": "",
    "SalesAgent": "SIEW KHENG"
  },
  {
    "CustomerGroup": "3000-M007",
    "Name": "MY LITTLE MIRACLE",
    "Address": "55, SIGLAP CENTRE #01-05",
    "Postal": "",
    "SalesAgent": "IVY"
  },
  {
    "CustomerGroup": "3000-M008",
    "Name": "METRO (PRIVATE) LIMITED",
    "Address": "391A ORCHARD ROAD #17-01",
    "Postal": "",
    "SalesAgent": "SAADIAH"
  },
  {
    "CustomerGroup": "3000-N001",
    "Name": "NBC MARKETING (S) PTE LTD ",
    "Address": "205, HENDERSON ROAD #08-02",
    "Postal": "",
    "SalesAgent": "DON"
  },
  {
    "CustomerGroup": "3000-N002",
    "Name": "NBCU GLOBAL NETWORKS ASIA PTE LTD ",
    "Address": "10 ANSON ROAD, #06-01",
    "Postal": "79903",
    "SalesAgent": "DON"
  },
  {
    "CustomerGroup": "3000-N003",
    "Name": "NEW TOUCH BOOK & STATIONERY STATION",
    "Address": "BLK 196A PUNGGOL FIELD",
    "Postal": "",
    "SalesAgent": "IVY"
  },
  {
    "CustomerGroup": "3000-N004",
    "Name": "NICKELODEON ASIA HOLDINGS PTE LTD",
    "Address": "151 LORONG CHUAN #03-08",
    "Postal": "",
    "SalesAgent": "DON"
  },
  {
    "CustomerGroup": "3000-N005",
    "Name": "NOONTALK MEDIA",
    "Address": "29 MEDIA CIR ,#01-04/05 ALICE",
    "Postal": "",
    "SalesAgent": "COMPANY"
  },
  {
    "CustomerGroup": "3000-N006",
    "Name": "NORTHERN RETAIL PTE LTD",
    "Address": "598 YISHUN RING ROAD",
    "Postal": "",
    "SalesAgent": "DON"
  },
  {
    "CustomerGroup": "3000-N007",
    "Name": "NTUC - FAIRPRICE ON (ONLINE) ",
    "Address": "ONLINE FULFILLMENT CENTRE (BENOI)",
    "Postal": "",
    "SalesAgent": "IVY"
  },
  {
    "CustomerGroup": "3000-N008",
    "Name": "NTUC FAIRPRICE CO-OPERATIVE LIMITED",
    "Address": "NO.1 JOO KOON CIRCLE ,#13-01 FAIRPRICE",
    "Postal": "",
    "SalesAgent": "IVY"
  },
  {
    "CustomerGroup": "3000-N009",
    "Name": "NINETEEN 37 TRADING",
    "Address": "BLK 342 UBI AVE 1, #01-937",
    "Postal": "",
    "SalesAgent": "IVY"
  },
  {
    "CustomerGroup": "3000-O001",
    "Name": "O-G (PRIVATE) LTD",
    "Address": "60 ALBERT STREET #05-00",
    "Postal": "",
    "SalesAgent": "XIAO YEN"
  },
  {
    "CustomerGroup": "3000-O002",
    "Name": "OTHER ACCOUNT - PROMOTION EVENT INCOME",
    "Address": "",
    "Postal": "",
    "SalesAgent": "COMPANY"
  },
  {
    "CustomerGroup": "3000-O003",
    "Name": "OTHER ACCOUNT - STAFF PURCHASES",
    "Address": "",
    "Postal": "",
    "SalesAgent": "COMPANY"
  },
  {
    "CustomerGroup": "3000-P001",
    "Name": "PACIFIC LICENSING STUDIO PTE LTD",
    "Address": "111 NORTH BRIDGE ROAD (PENINSULA PLAZA) ",
    "Postal": "",
    "SalesAgent": "DON"
  },
  {
    "CustomerGroup": "3000-P002",
    "Name": "PAN PACIFIC RETAIL MANAGEMENT(SINGAPORE)PTE. LTD.",
    "Address": "12 MARINA BOULEVARD, #34-03 ",
    "Postal": "",
    "SalesAgent": "DON"
  },
  {
    "CustomerGroup": "3000-P003",
    "Name": "PARTYBLOOMS",
    "Address": "2 YISHUN INDUSTRIAL STREET 1",
    "Postal": "",
    "SalesAgent": "SAADIAH"
  },
  {
    "CustomerGroup": "3000-P004",
    "Name": "PT. DALINY GUNA USAHA (OVERSEA)",
    "Address": "Jl RAYA KEBAYORAN LAMA NO. 39 B - C",
    "Postal": "",
    "SalesAgent": "COMPANY"
  },
  {
    "CustomerGroup": "3000-P005",
    "Name": "POPULAR BOOK CO (PTE) LTD",
    "Address": "15 SERANGOON NORTH AVE 5 ",
    "Postal": "",
    "SalesAgent": "LAYTIN"
  },
  {
    "CustomerGroup": "3000-Q001",
    "Name": "Qoo10 SINGAPORE",
    "Address": "5 TAMPINES CENTRAL 1, TAMPINES PLAZA",
    "Postal": "",
    "SalesAgent": "E-COMM"
  },
  {
    "CustomerGroup": "3000-R001",
    "Name": "RAIN AD PTE. LTD. ",
    "Address": "16 RAFFLES QUAY #41-07 ",
    "Postal": "",
    "SalesAgent": "DON"
  },
  {
    "CustomerGroup": "3000-R002",
    "Name": "RESORTS WORLD AT SENTOSA PTE. LTD.",
    "Address": "3 LIM TECK KIM ROAD #12-01 GENTING ",
    "Postal": "",
    "SalesAgent": "DON"
  },
  {
    "CustomerGroup": "3000-S001",
    "Name": "SCHON COLLECTION",
    "Address": "BLK 31 DEFU LANE 10 ",
    "Postal": "",
    "SalesAgent": "IVY"
  },
  {
    "CustomerGroup": "3000-S002",
    "Name": "SCHON HOLDING LLP",
    "Address": "BLK 31 DEFU LANE 10",
    "Postal": "",
    "SalesAgent": "IVY"
  },
  {
    "CustomerGroup": "3000-S003",
    "Name": "SHENG SIONG SUPERMARKET PTE LTD",
    "Address": "6 MANDAI LINK",
    "Postal": "",
    "SalesAgent": "IVY"
  },
  {
    "CustomerGroup": "3000-S004",
    "Name": "SHOPEE SINGAPORE",
    "Address": "5 Science Park Dr, Shopee Building",
    "Postal": "",
    "SalesAgent": "E-COMM"
  },
  {
    "CustomerGroup": "3000-S005",
    "Name": "SIDEK CLINIC FOR WOMEN PTE LTD ",
    "Address": "8 SINARAN DRIVE #06-03",
    "Postal": "",
    "SalesAgent": "DON"
  },
  {
    "CustomerGroup": "3000-S006",
    "Name": "SINGAPORE ZOOLOGICAL GARDENS",
    "Address": "80 MANDAI LAKE ROAD",
    "Postal": "",
    "SalesAgent": "DON"
  },
  {
    "CustomerGroup": "3000-S007",
    "Name": "SY NOVELTIES -SM",
    "Address": "33 SENGKANG WEST,SELETAR MALL",
    "Postal": "",
    "SalesAgent": "LAYTIN"
  },
  {
    "CustomerGroup": "3000-T001",
    "Name": "TIMES TRAVEL",
    "Address": "60 AIRPORT BOULEVARD #B16-026",
    "Postal": "",
    "SalesAgent": "SAADIAH"
  },
  {
    "CustomerGroup": "3000-T002",
    "Name": "TAKASHIMAYA SINGAPORE PTE LTD",
    "Address": "391A ORCHARD ROAD #10-11",
    "Postal": "",
    "SalesAgent": "XIAO YEN"
  },
  {
    "CustomerGroup": "3000-T003",
    "Name": "TIMES CENTRE (EXPERIENCE) ",
    "Address": "5TH FLOOR, 1 NEW INDUSTRIAL ROAD ",
    "Postal": "",
    "SalesAgent": "SAADIAH"
  },
  {
    "CustomerGroup": "3000-T004",
    "Name": "TIMEZONE SINGAPORE PTE LTD ",
    "Address": "491B RIVER VALLEY ROAD ",
    "Postal": "",
    "SalesAgent": "DON"
  },
  {
    "CustomerGroup": "3000-T005",
    "Name": "TOM & STEFANIE CORPORATION PTE LTD",
    "Address": "71 TOH GUAN ROAD EAST #02-07",
    "Postal": "",
    "SalesAgent": "SAADIAH"
  },
  {
    "CustomerGroup": "3000-T006",
    "Name": "TOM & STEFANIE ENTERPRISE PTE LTD",
    "Address": "71 TOH GUAN ROAD EAST #02-07",
    "Postal": "",
    "SalesAgent": "SAADIAH"
  },
  {
    "CustomerGroup": "3000-T007",
    "Name": "TOM & STEFANIE PTE LTD",
    "Address": "NO. 71 TOH GUAN ROAD EAST #02-07",
    "Postal": "",
    "SalesAgent": "SAADIAH"
  },
  {
    "CustomerGroup": "3000-T008",
    "Name": "TOYS HUNT",
    "Address": "2 TAMPINES CENTRAL 5",
    "Postal": "",
    "SalesAgent": "LAYTIN"
  },
  {
    "CustomerGroup": "3000-T009",
    "Name": "TOYS 'R' US (SINGAPORE) PTE. LTD.",
    "Address": "315 OUTRAM ROAD #14-09",
    "Postal": "",
    "SalesAgent": "SAADIAH"
  },
  {
    "CustomerGroup": "3000-T010",
    "Name": "TOYSHUNT",
    "Address": "1 KIM SENG PROMENADE #03-26",
    "Postal": "",
    "SalesAgent": "LAYTIN"
  },
  {
    "CustomerGroup": "3000-T011",
    "Name": "TOYSLAND - WEST COAST",
    "Address": "154 WEST COAST #B1-32",
    "Postal": "",
    "SalesAgent": "LAYTIN"
  },
  {
    "CustomerGroup": "3000-T012",
    "Name": "TURNER BROADCASTING SALES SOUTHEAST ASIA INC",
    "Address": "SOLARIS @ ONE-NORTH",
    "Postal": "",
    "SalesAgent": "DON"
  },
  {
    "CustomerGroup": "3000-V001",
    "Name": "V&V TRADING",
    "Address": "BLK 414 YISHUN RING ROAD",
    "Postal": "",
    "SalesAgent": "IVY"
  },
  {
    "CustomerGroup": "3000-V002",
    "Name": "VENDERMAC CONCEPT PTE LTD",
    "Address": "159, SIN MING ROAD #03-01 ",
    "Postal": "",
    "SalesAgent": "IVY"
  },
  {
    "CustomerGroup": "3000-V003",
    "Name": "VENDERMAC PTE LTD",
    "Address": "159, SIN MING ROAD #03-01 ",
    "Postal": "",
    "SalesAgent": "COMPANY"
  },
  {
    "CustomerGroup": "3000-V004",
    "Name": "VIRLUOSO PRESCHOOL PTE LTD",
    "Address": "3 GATEWAY #04-25, WESTGATE",
    "Postal": "",
    "SalesAgent": "IVY"
  },
  {
    "CustomerGroup": "3000-X001",
    "Name": "XIN XIU WUSHU PTE LTD",
    "Address": "159, SIN MING ROAD #03-01 ",
    "Postal": "",
    "SalesAgent": "COMPANY"
  },
  {
    "CustomerGroup": "3000-Z001",
    "Name": "ZAKKA SG",
    "Address": "159, SIN MING ROAD #03-01 ",
    "Postal": "",
    "SalesAgent": "E-COMM"
  },
  {
    "CustomerGroup": "3000-C011",
    "Name": "CREATIVE MOMS PTE LTD",
    "Address": "202, BEDOK SOUTH AVENUE 1",
    "Postal": null,
    "SalesAgent": "COMPANY"
  },
  {
    "CustomerGroup": "3000-A005",
    "Name": "AISYAH MUSTAFA",
    "Address": "BLK 711 , WOODLANDS DRIVE 70 , ",
    "Postal": "",
    "SalesAgent": "DON"
  },
  {
    "CustomerGroup": "3000-P006",
    "Name": "PAN PACIFIC RETAIL MANAGEMENT(SINGAPORE)PTE. LTD.- SUNTEC",
    "Address": "3 TEMASEK BOULEVARD",
    "Postal": null,
    "SalesAgent": "DON"
  },
  {
    "CustomerGroup": "3000-R003",
    "Name": "RESORTS WORLD AT SENTOSA PTE. LTD. (RTL)",
    "Address": "8 SENTOSA GATEWAY SINGAPORE",
    "Postal": "98269",
    "SalesAgent": "DON"
  },
  {
    "CustomerGroup": "3000-R004",
    "Name": "RC HOTELS (PTE) LTD",
    "Address": "2 STAMFORD ROAD,",
    "Postal": "178882",
    "SalesAgent": "DON"
  },
  {
    "CustomerGroup": "3000-A006",
    "Name": "ALPHA 7 CREATIVES",
    "Address": "20 MAXWELL ROAD #09-17",
    "Postal": null,
    "SalesAgent": "DON"
  },
  {
    "CustomerGroup": "3000-Y001",
    "Name": "YLF RETAIL (S) PTE LTD",
    "Address": "2 WOODLANDS SECTOR 1",
    "Postal": null,
    "SalesAgent": "DON"
  },
  {
    "CustomerGroup": "3000-P007",
    "Name": "PARCO SINGAPORE (MINIONS CAFE)",
    "Address": "10 ANSON ROAD,",
    "Postal": null,
    "SalesAgent": "DON"
  },
  {
    "CustomerGroup": "3000-H003",
    "Name": "HR MILLENNIUM PTE LTD",
    "Address": "211 HENDERSON ROAD, #04-03",
    "Postal": null,
    "SalesAgent": "DON"
  },
  {
    "CustomerGroup": "3000-D001",
    "Name": "DESIGN ORCHARD RETAIL SPACE",
    "Address": "250 ORCHARD ROAD,",
    "Postal": null,
    "SalesAgent": "DON"
  },
  {
    "CustomerGroup": "3000-0001",
    "Name": "DYNAMIC WORLD MONTESSORI PRESCHOOL",
    "Address": "292 EAST COAST ROAD",
    "Postal": "428951",
    "SalesAgent": "IVY"
  },
  {
    "CustomerGroup": "3000-B007",
    "Name": "BIZTMGP",
    "Address": "BIZ TRENDS PRODUCTIONS PTE LTD",
    "Postal": null,
    "SalesAgent": "DON"
  }
 ]

 export default customerData
 