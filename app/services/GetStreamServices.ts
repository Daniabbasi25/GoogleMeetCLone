import {StreamChat} from 'stream-chat';

const API_KEY = '2zzhbjwyg7q2';
const API_SECRET =
  '4279kq69kqurgpud2wavfgcyshpb6b3xgdaa7pacyzbup9nsc3vzcfqt86uh5wt2';
export const chatClient = StreamChat.getInstance(API_KEY);

export const connectUser = async (
  userId: string,
  userToken: string,
): Promise<void> => {
  await chatClient.connectUser(
    {
      id: userId,
      name: userId, // You can use a username or display name from your Firebase user data
    },
    userToken, // Generate token from your server using the user ID
  );
};

export const disconnectUser = async (): Promise<void> => {
  await chatClient.disconnectUser();
};
