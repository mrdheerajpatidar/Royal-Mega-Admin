module.exports = {
  content: [
    './app/**/*.html',
    './app/components/**/*.js',
    './app/containers/**/*.js',
    './app/utils/**/*.js',
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      reem: ['Montserrat', 'sans-serif'],
      poppins: ['Montserrat', 'sans-serif'],
    },
    extend: {
      fontSize: {
        10: '10px',
        11: '11px',
        12: '12px',
        13: '13px',
        14: '14px',
        15: '15px',
        16: '16px',
        18: '18px',
        20: '20px',
        22: '22px',
        24: '24px',
        26: '26px',
        28: '28px',
        30: '30px',
        32: '32px',
        36: '36px',
        42: '42px',
        46: '46px',
        48: '48px',
        56: '56px',
        60: '60px',
        76: '76px',
        80: '80px',
        90: '90px',
      },
      colors: {
        primary: {
          100: '#E9BC66',
          200: '#E9BC66',
          300: '#E9BC66',
          400: '#ffc556',
        },
        secondary: '#000',
      },
      borderRadius: {
        5: '5px',
        10: '10px',
        12: '12px',
        15: '15px',
        20: '20px',
      },
    },
    screens: {
      sm: '600px',
      md: '768px',
      lg: '992px',
      xl: '1280px',
      '2xl': '1366px',
      '3xl': '1440px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
      },
    },
    backgroundImage: {
      'gradient-1': 'linear-gradient(to right, #E9BC66, #E9BC66)',
      'gradient-2':
        'linear-gradient(to left,#D4AC54, #FFDEAC,#E3BA5D) !important;',
      'custom-gradient':
        'linear-gradient(90deg, #D4AC54 0%, #FFDEAC 50%, #E3BA5D 100%)',
    },
  },
};
