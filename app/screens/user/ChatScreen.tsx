import React, {useEffect, useState} from 'react';
import {
  Chat,
  Channel,
  MessageList,
  MessageInput,
} from 'stream-chat-react-native';
import {connectUser, disconnectUser, chatClient} from 'services';
import {StyleSheet, View} from 'react-native';

const ChatScreen = ({route}: any) => {
  const {groupId, userId, userToken} = route.params; // Pass these from your previous screen

  const [channel, setChannel] = useState<any>(null);

  useEffect(() => {
    const initChat = async () => {
      await connectUser(userId, userToken);
      const channel = chatClient.channel('messaging', groupId);
      await channel.watch();
      setChannel(channel);
    };

    initChat();

    return () => {
      disconnectUser();
    };
  }, [groupId, userId, userToken]);

  if (!channel) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <MessageList />
          <MessageInput />
        </Channel>
      </Chat>
    </View>
  );
};

export default ChatScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
