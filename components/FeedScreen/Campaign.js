import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

import { ListItem } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';

import { getProfileData } from '../../store/actions';

import styles from '../../constants/Stylesheet';

const Campaign = props => {
  const dispatch = useDispatch();
  const { title, users_id } = props.data;

  const handlePress = () => {
    dispatch(getProfileData(users_id));
    props.navigation.navigate('Pro', { orgId: users_id });
  };

  return (
    <View style={styles.container}>
      <ListItem
        onPress={() => handlePress(users_id)}
        title={props.data.username}
        leftAvatar={{ source: { uri: props.data.camp_img } }}
        subtitle={props.data.location}
      />
      <Image
        source={{ uri: props.data.camp_img }}
        style={styles.campImgContain}
      />
      <View style={styles.campDesc}>
        <Text style={styles.campDescUsername}>{props.data.username}</Text>
        <Text>{props.data.camp_desc}</Text>
      </View>
      <View style={styles.donateButton}>
        <TouchableOpacity
          style={styles.touchableButton}
          onPress={async () =>
            await WebBrowser.openBrowserAsync(
              'https://support.nature.org/site/Donation2?12640.donation=form1&df_id=12640&src=p_g.dfa.fd.x.dtd.EGT01&set.SingleDesignee=15852&crid=EGT01&sbid=B01&suslb=no&asid=100&moncb=no&s_src=p_g.dfa.fd.x.dtd.EGT01&gclid=Cj0KCQjwvo_qBRDQARIsAE-bsH9-sROQJs2hlLZCElWEEJR2M96cf0H6oNVRWKcerwapzSYfzJb9mfAaAqv3EALw_wcB'
            )
          }
        >
          <View style={styles.touchableView}>
            <Text style={styles.touchableText}>Donate</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

Campaign.navigationOptions = {
  title: 'Profile',
  // This setting needs to be on every screen so that header is in the center
  // This is fix for andriod devices should be good on IOS
  headerTitleStyle: {
    textAlign: 'center',
    flexGrow: 1,
    alignSelf: 'center'
  }
};

export default Campaign;