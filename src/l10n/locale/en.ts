export default {
	// ---------------------------------------      main.ts      --------------------------------------
	"translator-open-view": 		"Open translation view",
	"translator-change-service": 	"Change translation service", // (also used in ui/translator-components/ViewPage and modals/switch-service.ts)

	// ------------------------------------------------------------------------------------------------




	// -------------------------------------    handlers/*.ts    --------------------------------------
	"translator-invalid-api-key": 	"API key was not specified",
	"translator-invalid-region": 	"Region was not specified",
	"translator-invalid-host": 		"Host was not specified",
	"translator-invalid-other": 	"Something else went wrong",

	// ------------------------------------------------------------------------------------------------


	// ----------------------------------------    Hotkeys    -----------------------------------------
	"view-translate":				"Translate in focused view",
	"view-language-switch":			"Switch languages of focused view",
	"view-action-copy":				"Quickaction: Copy text in focused textarea",
	"view-action-clear":			"Quickaction: Clear text in focused textarea",
	"view-action-paste":			"Quickaction: Paste text in focused textarea",

	// ------------------------------------------------------------------------------------------------



	// -------------------------   ui/translator-components/ViewPage.svelte   -------------------------
	"service-not-validated": 		"Translation service is not validated",
	"revalidate-blocked-service": 	"Translation service was blocked, please validate the service again to unblock it",

	"auto-translate-off":		 	"Turn auto-translate off",
	"auto-translate-on":			"Turn auto-translate on",
	"show-all-languages": 			"Show all available languages",
	"show-spellchecker-languages": 	"Show spellchecker languages",
	"show-selected-languages": 		"Show manually selected languages",

	"detect-language": 				"Detect Language",
	// You can use the {} brackets to determine where the language name will be inserted.
	"detect-language-active":  		"Detect Language ({})",  // Detected Language (English)

	// ------------------------------------------------------------------------------------------------



	// -----------------------   ui/translator-components/SettingsPage.svelte   -----------------------
	"translation-service": 						"Translation Service",

	"display-language": 						"Language display name",
	"settings-display-language-help": 			"Select in which language the language name should be displayed",

	"settings-select-languages": 				"Translator languages",
	"settings-select-languages-help": 			"Choose languages to include in translator selection",

	"filter-languages": 						"Filter languages",
	"settings-filter-languages-help": 			"Determine which languages should be available for translation",
	"settings-filter-languages-0": 				"All languages",
	"settings-filter-languages-1": 				"Synced with spellchecker",
	"settings-filter-languages-2": 				"Manual selection",

	"api-key": 									"API key",
	"settings-api-key-help": 					"API key for translation service",

	"region": 									"Region",
	"settings-region-help": 					"If applicable, set the issue region of the API key",

	"host": 									"Host",
	"settings-host-help": 						"Enter the URL of the translation service",
	"settings-host-help-localhost": 			"🛈 You can host this service locally",

	"validate":									"Validate",
	"test":										"Test",
	"settings-validate-help":					"Ensure that the translation service is set-up properly",


	"auto-translate":							"Automatic translate",
	"settings-auto-translate-help":				"Translate text as it is being typed",
	"settings-auto-translate-help-warning":		"⚠ May quickly use up the APIs character quota",

	"update-languages":							"Update languages",
	"settings-update-languages-help":			"Update the list of available languages",
	"settings-update-languages-succes":			"Language selection updated",
	"settings-update-languages-error":			"Failed to fetch languages, check host or API key",

	// ------------------------------------------------------------------------------------------------

	// Extra locale information (such as en-gb, zh-tw, etc.)
	"HANS": "Simplified",
	"HANT": "Traditional",
	"LATN": "Latin",
	"CYRL": "Cyrillic",
	// TODO: Ask a Star Trek fan what PIQD is supposed to be (besides Picard)
	// "PIQD": "",
	"MONG": "Mongolian",
	"MTEI": "Meitei",
	"CHS": "Simplified",
	"CHT": "Traditional",

	// Region specifiers for locales
	"TW": "Taiwanese",
	"GB": "British",
	"US": "American",
	"BR": "Brazilian",
	"PT": "Portuguese",
	"CA": "Canadian",
	"CN": "PRC",

	// Locales that were not included in DisplayNames
	"iw": "Hebrew",
	"ikt": "Inuinnaqtun",
	"jw": "Javanese",
	"kmr": "Kurmanji",
	"mhr": "Eastern Mari",
	"mww": "Hmong Daw",
	"otq": "Otomi",
	"prs": "Dari",
	"yua": "Yucatec Maya",
	"Mtei": "Meitei",


	// Locales introduced by Fanyi Baidu
	"ber": "Berber",
	"bli": "Bilingual",
	"cnh": "Hakachin",
	"cnr": "Montenegrin",
	"pes": "Iranian Persian",
	"son": "Songhay",


	// Locales introduced by Azure Translator
	"nya": "Nyanja",
	"lug": "Ganda",
	"run": "Rundi",


	// Locales, you definitely do not need to add these, they are already provided for all of Obsidian's display languages
	"aa":	"Afar",
	"ab":	"Abkhazian",
	"ace":	"Achinese",
	"ach":	"Acoli",
	"ada":	"Adangme",
	"ady":	"Adyghe",
	"ae":	"Avestan",
	"aeb":	"Tunisian Arabic",
	"af":	"Afrikaans",
	"afh":	"Afrihili",
	"agq":	"Aghem",
	"ain":	"Ainu",
	"ak":	"Akan",
	"akk":	"Akkadian",
	"akz":	"Alabama",
	"ale":	"Aleut",
	"aln":	"Gheg Albanian",
	"alt":	"Southern Altai",
	"am":	"Amharic",
	"an":	"Aragonese",
	"ang":	"Old English",
	"anp":	"Angika",
	"ar":	"Arabic",
	"ar-001":	"Modern Standard Arabic",
	"arc":	"Aramaic",
	"arn":	"Mapuche",
	"aro":	"Araona",
	"arp":	"Arapaho",
	"arq":	"Algerian Arabic",
	"ars":	"Najdi Arabic",
	"arw":	"Arawak",
	"ary":	"Moroccan Arabic",
	"arz":	"Egyptian Arabic",
	"as":	"Assamese",
	"asa":	"Asu",
	"ase":	"American Sign Language",
	"ast":	"Asturian",
	"av":	"Avaric",
	"avk":	"Kotava",
	"awa":	"Awadhi",
	"ay":	"Aymara",
	"az":	"Azerbaijani",
	"ba":	"Bashkir",
	"bal":	"Baluchi",
	"ban":	"Balinese",
	"bar":	"Bavarian",
	"bas":	"Basaa",
	"bax":	"Bamun",
	"bbc":	"Batak Toba",
	"bbj":	"Ghomala",
	"be":	"Belarusian",
	"bej":	"Beja",
	"bem":	"Bemba",
	"bew":	"Betawi",
	"bez":	"Bena",
	"bfd":	"Bafut",
	"bfq":	"Badaga",
	"bg":	"Bulgarian",
	"bgn":	"Western Balochi",
	"bho":	"Bhojpuri",
	"bi":	"Bislama",
	"bik":	"Bikol",
	"bin":	"Bini",
	"bjn":	"Banjar",
	"bkm":	"Kom",
	"bla":	"Siksika",
	"bm":	"Bambara",
	"bn":	"Bangla",
	"bo":	"Tibetan",
	"bpy":	"Bishnupriya",
	"bqi":	"Bakhtiari",
	"br":	"Breton",
	"bra":	"Braj",
	"brh":	"Brahui",
	"brx":	"Bodo",
	"bs":	"Bosnian",
	"bss":	"Akoose",
	"bua":	"Buriat",
	"bug":	"Buginese",
	"bum":	"Bulu",
	"byn":	"Blin",
	"byv":	"Medumba",
	"ca":	"Catalan",
	"cad":	"Caddo",
	"car":	"Carib",
	"cay":	"Cayuga",
	"cch":	"Atsam",
	"ccp":	"Chakma",
	"ce":	"Chechen",
	"ceb":	"Cebuano",
	"cgg":	"Chiga",
	"ch":	"Chamorro",
	"chb":	"Chibcha",
	"chg":	"Chagatai",
	"chk":	"Chuukese",
	"chm":	"Mari",
	"chn":	"Chinook Jargon",
	"cho":	"Choctaw",
	"chp":	"Chipewyan",
	"chr":	"Cherokee",
	"chy":	"Cheyenne",
	"cic":	"Chickasaw",
	"ckb":	"Central Kurdish",
	"co":	"Corsican",
	"cop":	"Coptic",
	"cps":	"Capiznon",
	"cr":	"Cree",
	"crh":	"Crimean Turkish",
	"crs":	"Seselwa Creole French",
	"cs":	"Czech",
	"csb":	"Kashubian",
	"cu":	"Church Slavic",
	"cv":	"Chuvash",
	"cy":	"Welsh",
	"da":	"Danish",
	"dak":	"Dakota",
	"dar":	"Dargwa",
	"dav":	"Taita",
	"de":	"German",
	"de-AT":	"Austrian German",
	"de-CH":	"Swiss High German",
	"del":	"Delaware",
	"den":	"Slave",
	"dgr":	"Dogrib",
	"din":	"Dinka",
	"dje":	"Zarma",
	"doi":	"Dogri",
	"dsb":	"Lower Sorbian",
	"dtp":	"Central Dusun",
	"dua":	"Duala",
	"dum":	"Middle Dutch",
	"dv":	"Divehi",
	"dyo":	"Jola-Fonyi",
	"dyu":	"Dyula",
	"dz":	"Dzongkha",
	"dzg":	"Dazaga",
	"ebu":	"Embu",
	"ee":	"Ewe",
	"efi":	"Efik",
	"egl":	"Emilian",
	"egy":	"Ancient Egyptian",
	"eka":	"Ekajuk",
	"el":	"Greek",
	"elx":	"Elamite",
	"en":	"English",
	"en-AU":	"Australian English",
	"en-CA":	"Canadian English",
	"en-GB":	"British English",
	"en-US":	"American English",
	"enm":	"Middle English",
	"eo":	"Esperanto",
	"es":	"Spanish",
	"es-419":	"Latin American Spanish",
	"es-ES":	"European Spanish",
	"es-MX":	"Mexican Spanish",
	"esu":	"Central Yupik",
	"et":	"Estonian",
	"eu":	"Basque",
	"ewo":	"Ewondo",
	"ext":	"Extremaduran",
	"fa":	"Persian",
	"fa-AF":	"Dari",
	"fan":	"Fang",
	"fat":	"Fanti",
	"ff":	"Fulah",
	"fi":	"Finnish",
	"fil":	"Filipino",
	"fit":	"Tornedalen Finnish",
	"fj":	"Fijian",
	"fo":	"Faroese",
	"fon":	"Fon",
	"fr":	"French",
	"fr-CA":	"Canadian French",
	"fr-CH":	"Swiss French",
	"frc":	"Cajun French",
	"frm":	"Middle French",
	"fro":	"Old French",
	"frp":	"Arpitan",
	"frr":	"Northern Frisian",
	"frs":	"Eastern Frisian",
	"fur":	"Friulian",
	"fy":	"Western Frisian",
	"ga":	"Irish",
	"gaa":	"Ga",
	"gag":	"Gagauz",
	"gan":	"Gan Chinese",
	"gay":	"Gayo",
	"gba":	"Gbaya",
	"gbz":	"Zoroastrian Dari",
	"gd":	"Scottish Gaelic",
	"gez":	"Geez",
	"gil":	"Gilbertese",
	"gl":	"Galician",
	"glk":	"Gilaki",
	"gmh":	"Middle High German",
	"gn":	"Guarani",
	"goh":	"Old High German",
	"gom":	"Goan Konkani",
	"gon":	"Gondi",
	"gor":	"Gorontalo",
	"got":	"Gothic",
	"grb":	"Grebo",
	"grc":	"Ancient Greek",
	"gsw":	"Swiss German",
	"gu":	"Gujarati",
	"guc":	"Wayuu",
	"gur":	"Frafra",
	"guz":	"Gusii",
	"gv":	"Manx",
	"gwi":	"Gwichʼin",
	"ha":	"Hausa",
	"hai":	"Haida",
	"hak":	"Hakka Chinese",
	"haw":	"Hawaiian",
	"he":	"Hebrew",
	"hi":	"Hindi",
	"hif":	"Fiji Hindi",
	"hil":	"Hiligaynon",
	"hit":	"Hittite",
	"hmn":	"Hmong",
	"ho":	"Hiri Motu",
	"hr":	"Croatian",
	"hsb":	"Upper Sorbian",
	"hsn":	"Xiang Chinese",
	"ht":	"Haitian Creole",
	"hu":	"Hungarian",
	"hup":	"Hupa",
	"hy":	"Armenian",
	"hz":	"Herero",
	"ia":	"Interlingua",
	"iba":	"Iban",
	"ibb":	"Ibibio",
	"id":	"Indonesian",
	"ie":	"Interlingue",
	"ig":	"Igbo",
	"ii":	"Sichuan Yi",
	"ik":	"Inupiaq",
	"ilo":	"Iloko",
	"inh":	"Ingush",
	"io":	"Ido",
	"is":	"Icelandic",
	"it":	"Italian",
	"iu":	"Inuktitut",
	"izh":	"Ingrian",
	"ja":	"Japanese",
	"jam":	"Jamaican Creole English",
	"jbo":	"Lojban",
	"jgo":	"Ngomba",
	"jmc":	"Machame",
	"jpr":	"Judeo-Persian",
	"jrb":	"Judeo-Arabic",
	"jut":	"Jutish",
	"jv":	"Javanese",
	"ka":	"Georgian",
	"kaa":	"Kara-Kalpak",
	"kab":	"Kabyle",
	"kac":	"Kachin",
	"kaj":	"Jju",
	"kam":	"Kamba",
	"kaw":	"Kawi",
	"kbd":	"Kabardian",
	"kbl":	"Kanembu",
	"kcg":	"Tyap",
	"kde":	"Makonde",
	"kea":	"Kabuverdianu",
	"ken":	"Kenyang",
	"kfo":	"Koro",
	"kg":	"Kongo",
	"kgp":	"Kaingang",
	"kha":	"Khasi",
	"kho":	"Khotanese",
	"khq":	"Koyra Chiini",
	"khw":	"Khowar",
	"ki":	"Kikuyu",
	"kiu":	"Kirmanjki",
	"kj":	"Kuanyama",
	"kk":	"Kazakh",
	"kkj":	"Kako",
	"kl":	"Kalaallisut",
	"kln":	"Kalenjin",
	"km":	"Khmer",
	"kmb":	"Kimbundu",
	"kn":	"Kannada",
	"ko":	"Korean",
	"koi":	"Komi-Permyak",
	"kok":	"Konkani",
	"kos":	"Kosraean",
	"kpe":	"Kpelle",
	"kr":	"Kanuri",
	"krc":	"Karachay-Balkar",
	"kri":	"Krio",
	"krj":	"Kinaray-a",
	"krl":	"Karelian",
	"kru":	"Kurukh",
	"ks":	"Kashmiri",
	"ksb":	"Shambala",
	"ksf":	"Bafia",
	"ksh":	"Colognian",
	"ku":	"Kurdish",
	"kum":	"Kumyk",
	"kut":	"Kutenai",
	"kv":	"Komi",
	"kw":	"Cornish",
	"ky":	"Kyrgyz",
	"la":	"Latin",
	"lad":	"Ladino",
	"lag":	"Langi",
	"lah":	"Lahnda",
	"lam":	"Lamba",
	"lb":	"Luxembourgish",
	"lez":	"Lezghian",
	"lfn":	"Lingua Franca Nova",
	"lg":	"Ganda",
	"li":	"Limburgish",
	"lij":	"Ligurian",
	"liv":	"Livonian",
	"lkt":	"Lakota",
	"lmo":	"Lombard",
	"ln":	"Lingala",
	"lo":	"Lao",
	"lol":	"Mongo",
	"lou":	"Louisiana Creole",
	"loz":	"Lozi",
	"lrc":	"Northern Luri",
	"lt":	"Lithuanian",
	"ltg":	"Latgalian",
	"lu":	"Luba-Katanga",
	"lua":	"Luba-Lulua",
	"lui":	"Luiseno",
	"lun":	"Lunda",
	"luo":	"Luo",
	"lus":	"Mizo",
	"luy":	"Luyia",
	"lv":	"Latvian",
	"lzh":	"Literary Chinese",
	"lzz":	"Laz",
	"mad":	"Madurese",
	"maf":	"Mafa",
	"mag":	"Magahi",
	"mai":	"Maithili",
	"mak":	"Makasar",
	"man":	"Mandingo",
	"mas":	"Masai",
	"mde":	"Maba",
	"mdf":	"Moksha",
	"mdr":	"Mandar",
	"men":	"Mende",
	"mer":	"Meru",
	"mfe":	"Morisyen",
	"mg":	"Malagasy",
	"mga":	"Middle Irish",
	"mgh":	"Makhuwa-Meetto",
	"mgo":	"Metaʼ",
	"mh":	"Marshallese",
	"mi":	"Māori",
	"mic":	"Mi'kmaq",
	"min":	"Minangkabau",
	"mk":	"Macedonian",
	"ml":	"Malayalam",
	"mn":	"Mongolian",
	"mnc":	"Manchu",
	"mni":	"Manipuri",
	"moh":	"Mohawk",
	"mos":	"Mossi",
	"mr":	"Marathi",
	"mrj":	"Western Mari",
	"ms":	"Malay",
	"mt":	"Maltese",
	"mua":	"Mundang",
	"mul":	"Multiple languages",
	"mus":	"Muscogee",
	"mwl":	"Mirandese",
	"mwr":	"Marwari",
	"mwv":	"Mentawai",
	"my":	"Burmese",
	"mye":	"Myene",
	"myv":	"Erzya",
	"mzn":	"Mazanderani",
	"na":	"Nauru",
	"nan":	"Min Nan Chinese",
	"nap":	"Neapolitan",
	"naq":	"Nama",
	"nb":	"Norwegian Bokmål",
	"nd":	"North Ndebele",
	"nds":	"Low German",
	"nds-NL":	"Low Saxon",
	"ne":	"Nepali",
	"new":	"Newari",
	"ng":	"Ndonga",
	"nia":	"Nias",
	"niu":	"Niuean",
	"njo":	"Ao Naga",
	"nl":	"Dutch",
	"nl-BE":	"Flemish",
	"nmg":	"Kwasio",
	"nn":	"Norwegian Nynorsk",
	"nnh":	"Ngiemboon",
	"no":	"Norwegian",
	"nog":	"Nogai",
	"non":	"Old Norse",
	"nov":	"Novial",
	"nqo":	"N’Ko",
	"nr":	"South Ndebele",
	"nso":	"Northern Sotho",
	"nus":	"Nuer",
	"nv":	"Navajo",
	"nwc":	"Classical Newari",
	"ny":	"Nyanja",
	"nym":	"Nyamwezi",
	"nyn":	"Nyankole",
	"nyo":	"Nyoro",
	"nzi":	"Nzima",
	"oc":	"Occitan",
	"oj":	"Ojibwa",
	"om":	"Oromo",
	"or":	"Odia",
	"os":	"Ossetic",
	"osa":	"Osage",
	"ota":	"Ottoman Turkish",
	"pa":	"Punjabi",
	"pag":	"Pangasinan",
	"pal":	"Pahlavi",
	"pam":	"Pampanga",
	"pap":	"Papiamento",
	"pau":	"Palauan",
	"pcd":	"Picard",
	"pcm":	"Nigerian Pidgin",
	"pdc":	"Pennsylvania German",
	"pdt":	"Plautdietsch",
	"peo":	"Old Persian",
	"pfl":	"Palatine German",
	"phn":	"Phoenician",
	"pi":	"Pali",
	"pl":	"Polish",
	"pms":	"Piedmontese",
	"pnt":	"Pontic",
	"pon":	"Pohnpeian",
	"prg":	"Prussian",
	"pro":	"Old Provençal",
	"ps":	"Pashto",
	"pt":	"Portuguese",
	"pt-BR":	"Brazilian Portuguese",
	"pt-PT":	"European Portuguese",
	"qu":	"Quechua",
	"quc":	"Kʼicheʼ",
	"qug":	"Chimborazo Highland Quichua",
	"raj":	"Rajasthani",
	"rap":	"Rapanui",
	"rar":	"Rarotongan",
	"rgn":	"Romagnol",
	"rhg":	"Rohingya",
	"rif":	"Riffian",
	"rm":	"Romansh",
	"rn":	"Rundi",
	"ro":	"Romanian",
	"ro-MD":	"Moldavian",
	"rof":	"Rombo",
	"rom":	"Romany",
	"rtm":	"Rotuman",
	"ru":	"Russian",
	"rue":	"Rusyn",
	"rug":	"Roviana",
	"rup":	"Aromanian",
	"rw":	"Kinyarwanda",
	"rwk":	"Rwa",
	"sa":	"Sanskrit",
	"sad":	"Sandawe",
	"sah":	"Sakha",
	"sam":	"Samaritan Aramaic",
	"saq":	"Samburu",
	"sas":	"Sasak",
	"sat":	"Santali",
	"saz":	"Saurashtra",
	"sba":	"Ngambay",
	"sbp":	"Sangu",
	"sc":	"Sardinian",
	"scn":	"Sicilian",
	"sco":	"Scots",
	"sd":	"Sindhi",
	"sdc":	"Sassarese Sardinian",
	"sdh":	"Southern Kurdish",
	"se":	"Northern Sami",
	"see":	"Seneca",
	"seh":	"Sena",
	"sei":	"Seri",
	"sel":	"Selkup",
	"ses":	"Koyraboro Senni",
	"sg":	"Sango",
	"sga":	"Old Irish",
	"sgs":	"Samogitian",
	"sh":	"Serbo-Croatian",
	"shi":	"Tachelhit",
	"shn":	"Shan",
	"shu":	"Chadian Arabic",
	"si":	"Sinhala",
	"sid":	"Sidamo",
	"sk":	"Slovak",
	"sl":	"Slovenian",
	"sli":	"Lower Silesian",
	"sly":	"Selayar",
	"sm":	"Samoan",
	"sma":	"Southern Sami",
	"smj":	"Lule Sami",
	"smn":	"Inari Sami",
	"sms":	"Skolt Sami",
	"sn":	"Shona",
	"snk":	"Soninke",
	"so":	"Somali",
	"sog":	"Sogdien",
	"sq":	"Albanian",
	"sr":	"Serbian",
	"sr-ME":	"Montenegrin",
	"srn":	"Sranan Tongo",
	"srr":	"Serer",
	"ss":	"Swati",
	"ssy":	"Saho",
	"st":	"Southern Sotho",
	"stq":	"Saterland Frisian",
	"su":	"Sundanese",
	"suk":	"Sukuma",
	"sus":	"Susu",
	"sux":	"Sumerian",
	"sv":	"Swedish",
	"sw":	"Swahili",
	"sw-CD":	"Congo Swahili",
	"swb":	"Comorian",
	"syc":	"Classical Syriac",
	"syr":	"Syriac",
	"szl":	"Silesian",
	"ta":	"Tamil",
	"tcy":	"Tulu",
	"te":	"Telugu",
	"tem":	"Timne",
	"teo":	"Teso",
	"ter":	"Tereno",
	"tet":	"Tetum",
	"tg":	"Tajik",
	"th":	"Thai",
	"ti":	"Tigrinya",
	"tig":	"Tigre",
	"tiv":	"Tiv",
	"tk":	"Turkmen",
	"tkl":	"Tokelau",
	"tkr":	"Tsakhur",
	"tl":	"Tagalog",
	"tlh":	"Klingon",
	"tli":	"Tlingit",
	"tly":	"Talysh",
	"tmh":	"Tamashek",
	"tn":	"Tswana",
	"to":	"Tongan",
	"tog":	"Nyasa Tonga",
	"tpi":	"Tok Pisin",
	"tr":	"Turkish",
	"tru":	"Turoyo",
	"trv":	"Taroko",
	"ts":	"Tsonga",
	"tsd":	"Tsakonian",
	"tsi":	"Tsimshian",
	"tt":	"Tatar",
	"ttt":	"Muslim Tat",
	"tum":	"Tumbuka",
	"tvl":	"Tuvalu",
	"tw":	"Twi",
	"twq":	"Tasawaq",
	"ty":	"Tahitian",
	"tyv":	"Tuvinian",
	"tzm":	"Central Atlas Tamazight",
	"udm":	"Udmurt",
	"ug":	"Uyghur",
	"uga":	"Ugaritic",
	"uk":	"Ukrainian",
	"umb":	"Umbundu",
	"und":	"Unknown language",
	"ur":	"Urdu",
	"uz":	"Uzbek",
	"vai":	"Vai",
	"ve":	"Venda",
	"vec":	"Venetian",
	"vep":	"Veps",
	"vi":	"Vietnamese",
	"vls":	"West Flemish",
	"vmf":	"Main-Franconian",
	"vo":	"Volapük",
	"vot":	"Votic",
	"vro":	"Võro",
	"vun":	"Vunjo",
	"wa":	"Walloon",
	"wae":	"Walser",
	"wal":	"Wolaytta",
	"war":	"Waray",
	"was":	"Washo",
	"wbp":	"Warlpiri",
	"wo":	"Wolof",
	"wuu":	"Wu Chinese",
	"xal":	"Kalmyk",
	"xh":	"Xhosa",
	"xmf":	"Mingrelian",
	"xog":	"Soga",
	"yao":	"Yao",
	"yap":	"Yapese",
	"yav":	"Yangben",
	"ybb":	"Yemba",
	"yi":	"Yiddish",
	"yo":	"Yoruba",
	"yrl":	"Nheengatu",
	"yue":	"Cantonese",
	"za":	"Zhuang",
	"zap":	"Zapotec",
	"zbl":	"Blissymbols",
	"zea":	"Zeelandic",
	"zen":	"Zenaga",
	"zgh":	"Standard Moroccan Tamazight",
	"zh":	"Chinese",
	"zh-Hans":	"Simplified Chinese",
	"zh-Hant":	"Traditional Chinese",
	"zu":	"Zulu",
	"zun":	"Zuni",
	"zxx":	"No linguistic content",
	"zza":	"Zaza"
};
