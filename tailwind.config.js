/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './templates/**/*.html',
    './static/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        'soft-white': '#ECECEC', // Text Color
        'primary-blue': '#007BFF', // Primary Button
        'secondary-gray': '#6C757D', // Secondary Button
        'med-grey': '#2F2F2F', // Med Background
        'dark-grey': '#212121', // Dark Background
        'error-red': '#DC3545', // Error Alert
        
        
        'brand-blue': '#0056B3', // Main Color
        'tertiary-gray': '#F8F9FA', // Tertiary Button
        'light-grey': '#ADB5BD', // Borders
        'light-red': '#F8D7DA', // Error Text
        'dark-red': '#721C24', // Error Border
        'light-yellow': '#FFF3CD', // Warning Text ????
        'warning-yellow': '#FFC107', // Warning Alert
        'dark-yellow': '#856404', // Warning Border
      },
    },
  },
  plugins: [],
}

