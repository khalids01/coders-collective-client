
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

export const cssColors = {
    light: {
        ...COMMON,
        mode: 'light',
    },
    dark: {
        ...COMMON,
        mode: 'dark',
    },
}

export const colors = {
    light: {
        ...COMMON,
        mode: 'light',
        text: {
            primary: '#030303',
            secondary: '#666666',
            disabled: '#828282',
            muted: '#707070'
        },
        background: {
            paper: '#ddf1f7',
            default: '#ecf5ff',
            neutral: '#f3f6fe',
            lighter: '#e3eeff'
        },
        card: {
            active: '#508be9',
            focus: '#508be9',
            text: 'white'
        },
        shadows: {
            paper: '#bac8d3d5',
            default: '#f0f4fa',
            neutral: '#f8faff'
        }
    },
    dark: {
        ...COMMON,
        mode: 'dark',
        text: {
            primary: '#f4fafd',
            secondary: '#d2d2df',
            disabled: '#545456',
            muted: '#3c3c3c'
        },
        background: {
            paper: '#0e1520',
            default: '#171e28',
            neutral: '#1b212b',
            lighter: '#233043'
        },
        card: {
            active: '#4376c9',
            focus: '#4376c9',
            text: 'white'
        },
        shadows: {
            paper: '#2d476ecc',
            default: '#191f30',
            neutral: '#20232b'
        }
    },
}
