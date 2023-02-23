
const COMMON = {
    white: 'white',
    teal: '#64ffda',
    darkTeal: '#40d2af',
    divider: 'rgba(145, 158, 171, 0.24)',
    blue: '#2098F5',
    landingPage: {
        text: {
            header: 'rgb(243,244,246)',
            subScription: 'rgb(17, 24, 39)',
            footer: 'rgb(17, 24, 39)',
            textDisabled: '#9ca3af'
        },
        background: {
            header: 'rgb(17, 24, 39)',
            subScription: 'rgb(243,244,246)',
            footer: 'rgba(147,197,253,.5)'
        }
    }
}

const colors = {
    light: {
        ...COMMON,
        mode: 'light',
        text: { primary: '#030303', secondary: '#7C7C7D', disabled: '#7C7C7D' },
        background: { paper: '#DDF1F7', default: '#ECF5FF', neutral: '#F3F6FE', lighter: '#E3EEFF' },
        card: { active: '#5CC7F1', focus: '#508BE9', text: 'white' },
        shadows: {
            paper: '#BAC8D3D5', default: '#F0F4FA', neutral: '#F8FAFF'
        }
    },
    dark: {
        ...COMMON,
        mode: 'dark',
        text: { primary: '#F4FAFD', secondary: '#D2D2DF', disabled: '#8B8B9B' },
        background: { paper: '#0E1520', default: '#171E28', neutral: '#1B212B', lighter: '#233043' },
        card: { active: '#5E93B4', focus: '#4376C9', text: 'white' },
        shadows: {
            paper: '#2D476ECC', default: '#191F30', neutral: '#20232B'
        }
    },
}

export default colors