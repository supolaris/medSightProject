import React, { useRef } from 'react';
import {
  Text,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {
  actions,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor';

const App = () => {
  const richText = useRef<any>(null);

  const handleHead = ({ tintColor }: { tintColor: string }) => (
    <Text style={{ color: tintColor }}>H1</Text>
  );
  const setParagraph = ({ tintColor }: { tintColor: string }) => (
    <Text style={{ color: tintColor }}>P</Text>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}>
          <Text>Description:</Text>
          <RichEditor
            ref={richText}
            onChange={(descriptionText) => {
              console.log('descriptionText:', descriptionText);
            }}
          />
        </KeyboardAvoidingView>
      </ScrollView>

      <RichToolbar
        editor={richText}
        selectedIconTint="blue"
        actions={[
          actions.setBold,
          actions.setItalic,
          actions.setUnderline,
          actions.heading1,
          actions.setParagraph,
          actions.alignRight,
          actions.alignCenter,
          actions.alignLeft,
        ]}
        iconMap={{
          [actions.heading1]: handleHead,
          [actions.setParagraph]: setParagraph,
        }}
        onPress={(action: string) => {
          richText.current?.setContentFocus();
          richText.current?.dispatchCommand(action, '');
        }}
      />
    </SafeAreaView>
  );
};

export default App;
