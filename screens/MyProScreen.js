import React, { useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

import { Icon, ListItem } from 'react-native-elements';

import SvgUri from 'react-native-svg-uri';

import { getProfileData } from '../store/actions';

import EditButton from '../components/EditButton';

import ProfileHeader from '../components/Profile/ProfileHeader';

class MyProScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'My Profile',
      headerLeft: null,
      headerStyle: {
        backgroundColor: '#323338'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        textAlign: 'center',
        flexGrow: 1,
        alignSelf: 'center',
        fontFamily: 'OpenSans-SemiBold',
      },
      headerRight: <EditButton navigation={navigation} editRoute={'EditPro'} />
    };
  };

  componentDidMount() {
    console.log()
    this.props.getProfileData(this.props.currentUserProfile.id, false, 'myProfile');
  }

  render() {
    return (
      <ScrollView>
        <ProfileHeader
          navigation={this.props.navigation}
          myProfile={true}
          profile={this.props.currentUserProfile}
        />
        <View />
        <View>
          {this.props.currentUserProfile.campaigns &&
            this.props.currentUserProfile.campaigns.map(campaign => {
              return (
                <ListItem
                  key={campaign.camp_id}
                  title={campaign.camp_name}
                  leftAvatar={{ source: { uri: campaign.camp_img } }}
                  subtitle={campaign.location}
                  rightIcon={
                    <SvgUri
                      width='25'
                      height='25'
                      source={require('../assets/icons/ellipsis-vertical.svg')}
                    />
                  }
                />
              );
            })}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  currentUserProfile: state.currentUserProfile
});

export default connect(
  mapStateToProps,
  { getProfileData }
)(MyProScreen);
