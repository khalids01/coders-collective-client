
const COMMON = {
    white: 'var(--white)',
    teal: 'var(--teal)',
    darkTeal: 'var(--darkTeal)',
    divider: 'var(--divider)',
    blue: 'var(--blue)',
    landingPage: {
        text: {
            header: 'var(--landing-text-header)',
            subScription: 'var(--landing-text-subScription)',
            footer: 'var(--landing-text-footer)',
            textDisabled: 'var(--landing-text-textDisabled)'
        },
        background: {
            header: 'var(--landing-bg-header)',
            subScription: 'var(--landing-bg-subScription)',
            footer: 'var(--landing-bg-footer)'
        }
    },

    text: {
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        disabled: 'var(--text-disabled)',
        muted: 'var(--text-muted)'
    },
    background: {
        paper: 'var(--bg-paper)',
        default: 'var(--bg-default)',
        neutral: 'var(--bg-neutral)',
        lighter: 'var(--bg-lighter)'
    },
    card: {
        active: 'var(--card-active)',
        focus: 'var(--card-focus)',
        text: 'var(--card-text)'
    },
    shadows: {
        paper: 'var(--shadows-paper)',
        default: 'var(--shadows-default)',
        neutral: 'var(--shadows-neutral)'
    }
}

const colors = {
    light: {
        ...COMMON,
        mode: 'light',
    },
    dark: {
        ...COMMON,
        mode: 'dark',
    },
}

export default colors