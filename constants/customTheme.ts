
const COMMON = {
    teal: '#64ffda',
    darkTeal: '#40d2af',
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
        background: { paper: '#EAF2FE', default: '#F0F4FA', neutral: '#F8FAFF' },
        card: { active: '#7eb2ff', focus: '#5B96F7' },
    },
    dark: {
        ...COMMON,
        mode: 'dark',
        text: { primary: '#030303', secondary: '#7C7C7D', disabled: '#7C7C7D' },
        background: { paper: '#EAF2FE', default: '#F0F4FA', neutral: '#F8FAFF' },
        card: { active: '#7eb2ff', focus: '#5B96F7' },
    },
}

export default colors