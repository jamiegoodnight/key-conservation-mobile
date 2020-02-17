import React, { useEffect, useState } from 'react';
import { Text, View, Alert, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-navigation';
import { connect } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import styles from '../constants/screens/org-onboarding-styles/VettingCheck.js';
import { logout } from '../store/actions';

import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';

function VettingCheck(props) {
  useEffect(() => {
    getAirtableId();
  }, []);

  const [state, setState] = useState({
    email: '',
    id: '',
    key: ''
  });

  getBackend = async () => {
    const state = await SecureStore.getItemAsync('stateBE', {});
    const parseBE = JSON.parse(state);
    parseBE
      ? this.setState({
          org_name: parseBE.org_name,
          phone_number: parseBE.phone,
          mini_bio: parseBE.mission,
          species_and_habitats: parseBE.species,
          issues: parseBE.issues,
          facebook: parseBE.facebook,
          instagram: parseBE.instagram,
          twitter: parseBE.twitter,
          org_link_url: parseBE.website,
          location: parseBE.address + ', ' + parseBE.country
        })
      : null;
    await SecureStore.deleteItemAsync('stateBE', {});
  }; // Retrieves state object from SecureStore that was created in the onboarding process (ReviewYourInfoScreen).

  getAirtableId = async () => {
    const id = await SecureStore.getItemAsync('airtableID', {});
    const email = await SecureStore.getItemAsync('email', {});
    const key = await SecureStore.getItemAsync('airtableKey', {});
    setState({ email: email, id: id, key: key });
    updateAirtable();
    await SecureStore.setItemAsync('isVetting', 'true');
    await SecureStore.setItemAsync('vettingEmail', email);
    // This sets vetting variables to be checked by 'LoadingScreen'.
  };

  const checkAirtable = record => {
    console.log('checkAirtable activated');
    if (record.fields.accepted === true) {
      props.navigation.navigate('Welcome');
      console.log("You're good to go!");
    } else {
      console.log('not vetted yet!');
      Alert.alert('Oops', "You're not vetted yet", [{ text: 'Got it' }]);
    }
  }; // This Checks airtable 'Table 2' for 'accepted' field before allowig organization to access app.

  getAirtable = () => {
    var Airtable = require('airtable');
    var base = new Airtable({ apiKey: state.key }).base('appbPeeXUSNCQWwnQ');
    base('Table 2')
      .select({
        maxRecords: 20,
        view: 'Grid view',
        filterByFormula: `{email} = \'${state.email}\'`
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(function(record) {
            checkAirtable(record);
          });
        },
        function done(err) {
          if (err) {
            console.error(err);
            return;
          }
        }
      );
  }; // Checks 'Table 2' for 'accepted' field.

  updateAirtable = async () => {
    console.log('update airtable activated!');
    var Airtable = require('airtable');
    var base = new Airtable({ apiKey: state.key }).base('appbPeeXUSNCQWwnQ');
    await base('Table 1').update(
      [
        {
          id: state.id,
          fields: {
            isVetting: true
          }
        }
      ],
      function(err, records) {
        if (err) {
          console.error(err);
          return;
        }
        records.forEach(function(record) {
          // console.log(record.getId());
          console.log('done with update.');
        });
      }
    );
  }; // Updates 'isVetting' field in 'Table 1' based on airtable ID.

  logoutPress = async () => {
    await SecureStore.deleteItemAsync('sub', {});
    await SecureStore.deleteItemAsync('email', {});
    await SecureStore.deleteItemAsync('roles', {});
    await SecureStore.deleteItemAsync('id', {});
    await SecureStore.deleteItemAsync('accessToken', {});
    logout();

    const logoutURL = 'https://key-conservation.auth0.com/v2/logout?federated';

    if (Constants.platform.ios) {
      await WebBrowser.openAuthSessionAsync(logoutURL).then(result => {
        // this.setState({result})
      });
    } else {
      await WebBrowser.openBrowserAsync(logoutURL).then(result => {
        // this.setState({result})
      });
    }
    props.navigation.navigate('Logout');
  };

  return (
    <View style={styles.contentWrapper}>
      <View style={styles.obBody}>
        <Text style={styles.obTitle}>
          Thanks for submitting your application!
        </Text>
        <Text style={styles.obText}>
          You will receive an email with the outcome of your application in the
          next few days.
        </Text>

        <TouchableOpacity onPress={getAirtable} style={styles.greenButton}>
          <View style={styles.buttons}>
            <Text style={styles.greenText}>CHECK VETTING STATUS</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.spacer}></View>
        <TouchableOpacity onPress={logoutPress} style={styles.obFwdContainer}>
          <View style={styles.buttons}>
            <Text style={styles.obFwdBtnText}>LOGOUT</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default VettingCheck;
