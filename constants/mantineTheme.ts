import { MantineThemeOverride } from "@mantine/core"

const mantineTheme: MantineThemeOverride = {
    fontFamily: 'nunito, sans-serif',
    components: {
        TextInput: {
            styles: {
                input: {
                    height: 'auto'
                }
            },

        },
        Button: {
            styles: {
                root: {
                    height: 'auto',
                    minHeight: 40,
                }
            }
        }
    },
}

export default mantineTheme