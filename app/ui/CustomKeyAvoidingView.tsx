import { Children, FC, ReactNode } from 'react'
import {  StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'

interface Props { 
    children: ReactNode
}

const CustomKeyAvoidingView: FC<Props> = ({ children }) => { // Destructure 'children' from props
    return (
        <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={50}
    >
        <ScrollView>
          {children}
        </ScrollView>
    </KeyboardAvoidingView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default CustomKeyAvoidingView;