import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {Avatar, Button, Card} from 'react-native-paper';

interface Props {
  rightButtonTitle?: string;
  onrightButtonPress?: (id: string, email: string) => void;
  data: any[];
}
const UsersFlatList: FC<Props> = ({
  rightButtonTitle,
  data,
  onrightButtonPress,
}) => {
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      ListEmptyComponent={() => (
        <View style={styles.emptyComponent}>
          <Text style={styles.emptyText}>No Data Found</Text>
        </View>
      )}
      renderItem={({item}) => (
        <Card.Title
          title={item?.email}
          left={props => <Avatar.Image {...props} source={{uri: item.image}} />}
          right={
            rightButtonTitle
              ? props => (
                  <Button
                    mode="contained"
                    onPress={() =>
                      onrightButtonPress !== undefined &&
                      onrightButtonPress(item.id, item.email)
                    }
                    style={{borderRadius: 5}}>
                    {rightButtonTitle}
                  </Button>
                )
              : () => <></>
          }
        />
      )}
      //   {...extra}
    />
  );
};

export default UsersFlatList;

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    width: '95%',
    alignSelf: 'center',
    marginTop: 5,
    borderBlockColor: 'gray',
  },
  emptyComponent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 18,
  },
});
