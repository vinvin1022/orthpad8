import { router } from 'expo-router';
import { Text, View } from 'react-native';

import { useSession } from './ctx';

export default function SignIn() {
  console.log("SignIn")

  const { signIn } = useSession();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        onPress={() => {
          signIn();
          // Navigate after signing in. You may want to tweak this to ensure sign-in is
          // successful before navigating.
          router.replace('/(app)/');
        }}>
        Sign In
      </Text>
    </View>
  );
}
