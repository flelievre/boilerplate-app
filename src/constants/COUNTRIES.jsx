const COUNTRIES = [
  {
    code: 'AF',
    name: 'Afghanistan',
    isInEU: false,
  },
  {
    code: 'AX',
    name: 'Åland Islands',
    isInEU: false,
  },
  {
    code: 'AL',
    name: 'Albania',
    isInEU: false,
  },
  {
    code: 'DZ',
    name: 'Algeria',
    isInEU: false,
  },
  {
    code: 'AD',
    name: 'Andorra',
    isInEU: false,
  },
  {
    code: 'AO',
    name: 'Angola',
    isInEU: false,
  },
  {
    code: 'AI',
    name: 'Anguilla',
    isInEU: false,
  },
  {
    code: 'AQ',
    name: 'Antarctica',
    isInEU: false,
  },
  {
    code: 'AG',
    name: 'Antigua & Barbuda',
    isInEU: false,
  },
  {
    code: 'AR',
    name: 'Argentina',
    isInEU: false,
  },
  {
    code: 'AM',
    name: 'Armenia',
    isInEU: false,
  },
  {
    code: 'AW',
    name: 'Aruba',
    isInEU: false,
  },
  {
    code: 'AC',
    name: 'Ascension Island',
    isInEU: false,
  },
  {
    code: 'AU',
    name: 'Australia',
    isInEU: false,
  },
  {
    code: 'AT',
    name: 'Austria',
    isInEU: true,
  },
  {
    code: 'AZ',
    name: 'Azerbaijan',
    isInEU: false,
  },
  {
    code: 'BS',
    name: 'Bahamas',
    isInEU: false,
  },
  {
    code: 'BH',
    name: 'Bahrain',
    isInEU: false,
  },
  {
    code: 'BD',
    name: 'Bangladesh',
    isInEU: false,
  },
  {
    code: 'BB',
    name: 'Barbados',
    isInEU: false,
  },
  {
    code: 'BY',
    name: 'Belarus',
    isInEU: false,
  },
  {
    code: 'BE',
    name: 'Belgium',
    isInEU: true,
  },
  {
    code: 'BZ',
    name: 'Belize',
    isInEU: false,
  },
  {
    code: 'BJ',
    name: 'Benin',
    isInEU: false,
  },
  {
    code: 'BM',
    name: 'Bermuda',
    isInEU: false,
  },
  {
    code: 'BT',
    name: 'Bhutan',
    isInEU: false,
  },
  {
    code: 'BO',
    name: 'Bolivia',
    isInEU: false,
  },
  {
    code: 'BA',
    name: 'Bosnia & Herzegovina',
    isInEU: false,
  },
  {
    code: 'BW',
    name: 'Botswana',
    isInEU: false,
  },
  {
    code: 'BV',
    name: 'Bouvet Island',
    isInEU: false,
  },
  {
    code: 'BR',
    name: 'Brazil',
    isInEU: false,
  },
  {
    code: 'IO',
    name: 'British Indian Ocean Territory',
    isInEU: false,
  },
  {
    code: 'VG',
    name: 'British Virgin Islands',
    isInEU: false,
  },
  {
    code: 'BN',
    name: 'Brunei',
    isInEU: false,
  },
  {
    code: 'BG',
    name: 'Bulgaria',
    isInEU: true,
  },
  {
    code: 'BF',
    name: 'Burkina Faso',
    isInEU: false,
  },
  {
    code: 'BI',
    name: 'Burundi',
    isInEU: false,
  },
  {
    code: 'KH',
    name: 'Cambodia',
    isInEU: false,
  },
  {
    code: 'CM',
    name: 'Cameroon',
    isInEU: false,
  },
  {
    code: 'CA',
    name: 'Canada',
    isInEU: false,
  },
  {
    code: 'CV',
    name: 'Cape Verde',
    isInEU: false,
  },
  {
    code: 'BQ',
    name: 'Caribbean Netherlands',
    isInEU: false,
  },
  {
    code: 'KY',
    name: 'Cayman Islands',
    isInEU: false,
  },
  {
    code: 'CF',
    name: 'Central African Republic',
    isInEU: false,
  },
  {
    code: 'TD',
    name: 'Chad',
    isInEU: false,
  },
  {
    code: 'CL',
    name: 'Chile',
    isInEU: false,
  },
  {
    code: 'CN',
    name: 'China',
    isInEU: false,
  },
  {
    code: 'CO',
    name: 'Colombia',
    isInEU: false,
  },
  {
    code: 'KM',
    name: 'Comoros',
    isInEU: false,
  },
  {
    code: 'CG',
    name: 'Congo - Brazzaville',
    isInEU: false,
  },
  {
    code: 'CD',
    name: 'Congo - Kinshasa',
    isInEU: false,
  },
  {
    code: 'CK',
    name: 'Cook Islands',
    isInEU: false,
  },
  {
    code: 'CR',
    name: 'Costa Rica',
    isInEU: false,
  },
  {
    code: 'CI',
    name: 'Côte d’Ivoire',
    isInEU: false,
  },
  {
    code: 'HR',
    name: 'Croatia',
    isInEU: true,
  },
  {
    code: 'CW',
    name: 'Curaçao',
    isInEU: false,
  },
  {
    code: 'CY',
    name: 'Cyprus',
    isInEU: true,
  },
  {
    code: 'CZ',
    name: 'Czechia',
    isInEU: true,
  },
  {
    code: 'DK',
    name: 'Denmark',
    isInEU: true,
  },
  {
    code: 'DJ',
    name: 'Djibouti',
    isInEU: false,
  },
  {
    code: 'DM',
    name: 'Dominica',
    isInEU: false,
  },
  {
    code: 'DO',
    name: 'Dominican Republic',
    isInEU: false,
  },
  {
    code: 'EC',
    name: 'Ecuador',
    isInEU: false,
  },
  {
    code: 'EG',
    name: 'Egypt',
    isInEU: false,
  },
  {
    code: 'SV',
    name: 'El Salvador',
    isInEU: false,
  },
  {
    code: 'GQ',
    name: 'Equatorial Guinea',
    isInEU: false,
  },
  {
    code: 'ER',
    name: 'Eritrea',
    isInEU: false,
  },
  {
    code: 'EE',
    name: 'Estonia',
    isInEU: true,
  },
  {
    code: 'SZ',
    name: 'Eswatini',
    isInEU: false,
  },
  {
    code: 'ET',
    name: 'Ethiopia',
    isInEU: false,
  },
  {
    code: 'FK',
    name: 'Falkland Islands',
    isInEU: false,
  },
  {
    code: 'FO',
    name: 'Faroe Islands',
    isInEU: false,
  },
  {
    code: 'FJ',
    name: 'Fiji',
    isInEU: false,
  },
  {
    code: 'FI',
    name: 'Finland',
    isInEU: true,
  },
  {
    code: 'FR',
    name: 'France',
    isInEU: true,
  },
  {
    code: 'GF',
    name: 'French Guiana',
    isInEU: true,
  },
  {
    code: 'PF',
    name: 'French Polynesia',
    isInEU: false,
  },
  {
    code: 'TF',
    name: 'French Southern Territories',
    isInEU: false,
  },
  {
    code: 'GA',
    name: 'Gabon',
    isInEU: false,
  },
  {
    code: 'GM',
    name: 'Gambia',
    isInEU: false,
  },
  {
    code: 'GE',
    name: 'Georgia',
    isInEU: false,
  },
  {
    code: 'DE',
    name: 'Germany',
    isInEU: true,
  },
  {
    code: 'GH',
    name: 'Ghana',
    isInEU: false,
  },
  {
    code: 'GI',
    name: 'Gibraltar',
    isInEU: false,
  },
  {
    code: 'GR',
    name: 'Greece',
    isInEU: true,
  },
  {
    code: 'GL',
    name: 'Greenland',
    isInEU: false,
  },
  {
    code: 'GD',
    name: 'Grenada',
    isInEU: false,
  },
  {
    code: 'GP',
    name: 'Guadeloupe',
    isInEU: true,
  },
  {
    code: 'GU',
    name: 'Guam',
    isInEU: false,
  },
  {
    code: 'GT',
    name: 'Guatemala',
    isInEU: false,
  },
  {
    code: 'GG',
    name: 'Guernsey',
    isInEU: false,
  },
  {
    code: 'GN',
    name: 'Guinea',
    isInEU: false,
  },
  {
    code: 'GW',
    name: 'Guinea-Bissau',
    isInEU: false,
  },
  {
    code: 'GY',
    name: 'Guyana',
    isInEU: false,
  },
  {
    code: 'HT',
    name: 'Haiti',
    isInEU: false,
  },
  {
    code: 'HN',
    name: 'Honduras',
    isInEU: false,
  },
  {
    code: 'HK',
    name: 'Hong Kong SAR China',
    isInEU: false,
  },
  {
    code: 'HU',
    name: 'Hungary',
    isInEU: true,
  },
  {
    code: 'IS',
    name: 'Iceland',
    isInEU: false,
  },
  {
    code: 'IN',
    name: 'India',
    isInEU: false,
  },
  {
    code: 'ID',
    name: 'Indonesia',
    isInEU: false,
  },
  {
    code: 'IQ',
    name: 'Iraq',
    isInEU: false,
  },
  {
    code: 'IE',
    name: 'Ireland',
    isInEU: true,
  },
  {
    code: 'IM',
    name: 'Isle of Man',
    isInEU: false,
  },
  {
    code: 'IL',
    name: 'Israel',
    isInEU: false,
  },
  {
    code: 'IT',
    name: 'Italy',
    isInEU: true,
  },
  {
    code: 'JM',
    name: 'Jamaica',
    isInEU: false,
  },
  {
    code: 'JP',
    name: 'Japan',
    isInEU: false,
  },
  {
    code: 'JE',
    name: 'Jersey',
    isInEU: false,
  },
  {
    code: 'JO',
    name: 'Jordan',
    isInEU: false,
  },
  {
    code: 'KZ',
    name: 'Kazakhstan',
    isInEU: false,
  },
  {
    code: 'KE',
    name: 'Kenya',
    isInEU: false,
  },
  {
    code: 'KI',
    name: 'Kiribati',
    isInEU: false,
  },
  {
    code: 'XK',
    name: 'Kosovo',
    isInEU: false,
  },
  {
    code: 'KW',
    name: 'Kuwait',
    isInEU: false,
  },
  {
    code: 'KG',
    name: 'Kyrgyzstan',
    isInEU: false,
  },
  {
    code: 'LA',
    name: 'Laos',
    isInEU: false,
  },
  {
    code: 'LV',
    name: 'Latvia',
    isInEU: true,
  },
  {
    code: 'LB',
    name: 'Lebanon',
    isInEU: false,
  },
  {
    code: 'LS',
    name: 'Lesotho',
    isInEU: false,
  },
  {
    code: 'LR',
    name: 'Liberia',
    isInEU: false,
  },
  {
    code: 'LY',
    name: 'Libya',
    isInEU: false,
  },
  {
    code: 'LI',
    name: 'Liechtenstein',
    isInEU: false,
  },
  {
    code: 'LT',
    name: 'Lithuania',
    isInEU: true,
  },
  {
    code: 'LU',
    name: 'Luxembourg',
    isInEU: true,
  },
  {
    code: 'MO',
    name: 'Macao SAR China',
    isInEU: false,
  },
  {
    code: 'MG',
    name: 'Madagascar',
    isInEU: false,
  },
  {
    code: 'MW',
    name: 'Malawi',
    isInEU: false,
  },
  {
    code: 'MY',
    name: 'Malaysia',
    isInEU: false,
  },
  {
    code: 'MV',
    name: 'Maldives',
    isInEU: false,
  },
  {
    code: 'ML',
    name: 'Mali',
    isInEU: false,
  },
  {
    code: 'MT',
    name: 'Malta',
    isInEU: true,
  },
  {
    code: 'MQ',
    name: 'Martinique',
    isInEU: true,
  },
  {
    code: 'MR',
    name: 'Mauritania',
    isInEU: false,
  },
  {
    code: 'MU',
    name: 'Mauritius',
    isInEU: false,
  },
  {
    code: 'YT',
    name: 'Mayotte',
    isInEU: true,
  },
  {
    code: 'MX',
    name: 'Mexico',
    isInEU: false,
  },
  {
    code: 'MD',
    name: 'Moldova',
    isInEU: false,
  },
  {
    code: 'MC',
    name: 'Monaco',
    isInEU: false,
  },
  {
    code: 'MN',
    name: 'Mongolia',
    isInEU: false,
  },
  {
    code: 'ME',
    name: 'Montenegro',
    isInEU: false,
  },
  {
    code: 'MS',
    name: 'Montserrat',
    isInEU: false,
  },
  {
    code: 'MA',
    name: 'Morocco',
    isInEU: false,
  },
  {
    code: 'MZ',
    name: 'Mozambique',
    isInEU: false,
  },
  {
    code: 'MM',
    name: 'Myanmar (Burma)',
    isInEU: false,
  },
  {
    code: 'NA',
    name: 'Namibia',
    isInEU: false,
  },
  {
    code: 'NR',
    name: 'Nauru',
    isInEU: false,
  },
  {
    code: 'NP',
    name: 'Nepal',
    isInEU: false,
  },
  {
    code: 'NL',
    name: 'Netherlands',
    isInEU: true,
  },
  {
    code: 'NC',
    name: 'New Caledonia',
    isInEU: false,
  },
  {
    code: 'NZ',
    name: 'New Zealand',
    isInEU: false,
  },
  {
    code: 'NI',
    name: 'Nicaragua',
    isInEU: false,
  },
  {
    code: 'NE',
    name: 'Niger',
    isInEU: false,
  },
  {
    code: 'NG',
    name: 'Nigeria',
    isInEU: false,
  },
  {
    code: 'NU',
    name: 'Niue',
    isInEU: false,
  },
  {
    code: 'MK',
    name: 'North Macedonia',
    isInEU: false,
  },
  {
    code: 'NO',
    name: 'Norway',
    isInEU: false,
  },
  {
    code: 'OM',
    name: 'Oman',
    isInEU: false,
  },
  {
    code: 'PK',
    name: 'Pakistan',
    isInEU: false,
  },
  {
    code: 'PS',
    name: 'Palestinian Territories',
    isInEU: false,
  },
  {
    code: 'PA',
    name: 'Panama',
    isInEU: false,
  },
  {
    code: 'PG',
    name: 'Papua New Guinea',
    isInEU: false,
  },
  {
    code: 'PY',
    name: 'Paraguay',
    isInEU: false,
  },
  {
    code: 'PE',
    name: 'Peru',
    isInEU: false,
  },
  {
    code: 'PH',
    name: 'Philippines',
    isInEU: false,
  },
  {
    code: 'PN',
    name: 'Pitcairn Islands',
    isInEU: false,
  },
  {
    code: 'PL',
    name: 'Poland',
    isInEU: true,
  },
  {
    code: 'PT',
    name: 'Portugal',
    isInEU: true,
  },
  {
    code: 'PR',
    name: 'Puerto Rico',
    isInEU: false,
  },
  {
    code: 'QA',
    name: 'Qatar',
    isInEU: false,
  },
  {
    code: 'RE',
    name: 'Réunion',
    isInEU: true,
  },
  {
    code: 'RO',
    name: 'Romania',
    isInEU: true,
  },
  {
    code: 'RU',
    name: 'Russia',
    isInEU: false,
  },
  {
    code: 'RW',
    name: 'Rwanda',
    isInEU: false,
  },
  {
    code: 'WS',
    name: 'Samoa',
    isInEU: false,
  },
  {
    code: 'SM',
    name: 'San Marino',
    isInEU: false,
  },
  {
    code: 'ST',
    name: 'São Tomé & Príncipe',
    isInEU: false,
  },
  {
    code: 'SA',
    name: 'Saudi Arabia',
    isInEU: false,
  },
  {
    code: 'SN',
    name: 'Senegal',
    isInEU: false,
  },
  {
    code: 'RS',
    name: 'Serbia',
    isInEU: false,
  },
  {
    code: 'SC',
    name: 'Seychelles',
    isInEU: false,
  },
  {
    code: 'SL',
    name: 'Sierra Leone',
    isInEU: false,
  },
  {
    code: 'SG',
    name: 'Singapore',
    isInEU: false,
  },
  {
    code: 'SX',
    name: 'Sint Maarten',
    isInEU: false,
  },
  {
    code: 'SK',
    name: 'Slovakia',
    isInEU: true,
  },
  {
    code: 'SI',
    name: 'Slovenia',
    isInEU: true,
  },
  {
    code: 'SB',
    name: 'Solomon Islands',
    isInEU: false,
  },
  {
    code: 'SO',
    name: 'Somalia',
    isInEU: false,
  },
  {
    code: 'ZA',
    name: 'South Africa',
    isInEU: false,
  },
  {
    code: 'GS',
    name: 'South Georgia & South Sandwich Islands',
    isInEU: false,
  },
  {
    code: 'KR',
    name: 'South Korea',
    isInEU: false,
  },
  {
    code: 'SS',
    name: 'South Sudan',
    isInEU: false,
  },
  {
    code: 'ES',
    name: 'Spain',
    isInEU: true,
  },
  {
    code: 'LK',
    name: 'Sri Lanka',
    isInEU: false,
  },
  {
    code: 'BL',
    name: 'St. Barthélemy',
    isInEU: false,
  },
  {
    code: 'SH',
    name: 'St. Helena',
    isInEU: false,
  },
  {
    code: 'KN',
    name: 'St. Kitts & Nevis',
    isInEU: false,
  },
  {
    code: 'LC',
    name: 'St. Lucia',
    isInEU: false,
  },
  {
    code: 'MF',
    name: 'St. Martin',
    isInEU: true,
  },
  {
    code: 'PM',
    name: 'St. Pierre & Miquelon',
    isInEU: false,
  },
  {
    code: 'VC',
    name: 'St. Vincent & Grenadines',
    isInEU: false,
  },
  {
    code: 'SD',
    name: 'Sudan',
    isInEU: false,
  },
  {
    code: 'SR',
    name: 'Suriname',
    isInEU: false,
  },
  {
    code: 'SJ',
    name: 'Svalbard & Jan Mayen',
    isInEU: false,
  },
  {
    code: 'SE',
    name: 'Sweden',
    isInEU: true,
  },
  {
    code: 'CH',
    name: 'Switzerland',
    isInEU: false,
  },
  {
    code: 'TW',
    name: 'Taiwan',
    isInEU: false,
  },
  {
    code: 'TJ',
    name: 'Tajikistan',
    isInEU: false,
  },
  {
    code: 'TZ',
    name: 'Tanzania',
    isInEU: false,
  },
  {
    code: 'TH',
    name: 'Thailand',
    isInEU: false,
  },
  {
    code: 'TL',
    name: 'Timor-Leste',
    isInEU: false,
  },
  {
    code: 'TG',
    name: 'Togo',
    isInEU: false,
  },
  {
    code: 'TK',
    name: 'Tokelau',
    isInEU: false,
  },
  {
    code: 'TO',
    name: 'Tonga',
    isInEU: false,
  },
  {
    code: 'TT',
    name: 'Trinidad & Tobago',
    isInEU: false,
  },
  {
    code: 'TA',
    name: 'Tristan da Cunha',
    isInEU: false,
  },
  {
    code: 'TN',
    name: 'Tunisia',
    isInEU: false,
  },
  {
    code: 'TR',
    name: 'Türkiye',
    isInEU: false,
  },
  {
    code: 'TM',
    name: 'Turkmenistan',
    isInEU: false,
  },
  {
    code: 'TC',
    name: 'Turks & Caicos Islands',
    isInEU: false,
  },
  {
    code: 'TV',
    name: 'Tuvalu',
    isInEU: false,
  },
  {
    code: 'UG',
    name: 'Uganda',
    isInEU: false,
  },
  {
    code: 'UA',
    name: 'Ukraine',
    isInEU: false,
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    isInEU: false,
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    isInEU: false,
  },
  {
    code: 'US',
    name: 'United States',
    isInEU: false,
  },
  {
    code: 'UY',
    name: 'Uruguay',
    isInEU: false,
  },
  {
    code: 'UZ',
    name: 'Uzbekistan',
    isInEU: false,
  },
  {
    code: 'VU',
    name: 'Vanuatu',
    isInEU: false,
  },
  {
    code: 'VA',
    name: 'Vatican City',
    isInEU: false,
  },
  {
    code: 'VE',
    name: 'Venezuela',
    isInEU: false,
  },
  {
    code: 'VN',
    name: 'Vietnam',
    isInEU: false,
  },
  {
    code: 'WF',
    name: 'Wallis & Futuna',
    isInEU: false,
  },
  {
    code: 'EH',
    name: 'Western Sahara',
    isInEU: false,
  },
  {
    code: 'YE',
    name: 'Yemen',
    isInEU: false,
  },
  {
    code: 'ZM',
    name: 'Zambia',
    isInEU: false,
  },
  {
    code: 'ZW',
    name: 'Zimbabwe',
    isInEU: false,
  },
];

export default COUNTRIES;
