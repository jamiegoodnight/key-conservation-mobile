import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import * as WebBrowser from 'expo-web-browser';

import { Icon, ListItem } from 'react-native-elements';

const DetailAboutUs = props => {
  let profile = props.profile;

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.sections}>
          <View style={styles.iconWrap}>
            <Icon type='font-awesome' name='list' />
            <Text style={styles.title}>{'  About Us'}</Text>
          </View>
          <Text style={styles.body}>{profile.about_us}</Text>
        </View>

        <View style={styles.sections}>
          <View style={styles.iconWrap}>
            <Icon type='font-awesome' name='leaf' />
            <Text style={styles.title}>
              {'  Species & Habitats we work with'}
            </Text>
          </View>
          <View style={styles.body}>
            <Text>{profile.species_and_habitats}</Text>
          </View>
        </View>

        <View style={styles.sections}>
          <View style={styles.iconWrap}>
            <Icon type='font-awesome' name='leaf' />
            <Text style={styles.title}>{'  Big Issues'}</Text>
          </View>
          <View style={styles.body}>
            <Text>{profile.issues}</Text>
          </View>
        </View>
        <View style={styles.sections}>
          <View style={styles.iconWrap}>
            <Icon type='font-awesome' name='rocket' />
            <Text style={styles.title}>{'  Support Our Mission'}</Text>
          </View>
          <View style={styles.body}>
            <Text>{profile.support_us}</Text>
            <View style={styles.donateButton}>
              <TouchableOpacity
                onPress={async () =>
                  await WebBrowser.openBrowserAsync(
                    'https://support.nature.org/site/Donation2?12640.donation=form1&df_id=12640&src=p_g.dfa.fd.x.dtd.EGT01&set.SingleDesignee=15852&crid=EGT01&sbid=B01&suslb=no&asid=100&moncb=no&s_src=p_g.dfa.fd.x.dtd.EGT01&gclid=Cj0KCQjwvo_qBRDQARIsAE-bsH9-sROQJs2hlLZCElWEEJR2M96cf0H6oNVRWKcerwapzSYfzJb9mfAaAqv3EALw_wcB'
                  )
                }
                style={{
                  paddingTop: 25,
                  paddingBottom: 25,
                  width: 243,
                  height: 50
                }}
              >
                <View
                  style={{
                    backgroundColor: '#00ff9d',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 5,
                    height: 35
                  }}
                >
                  <Text
                    style={{
                      color: '#323339',
                      textTransform: 'uppercase',
                      fontWeight: 'bold',
                      letterSpacing: 2
                    }}
                  >
                    Donate
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    margin: 15,
    textAlign: 'justify',
    lineHeight: 30
  },
  title: {
    fontSize: 20
  },
  body: {
    marginTop: 10,
    flexDirection: 'column',
    flexWrap: 'nowrap'
  },
  iconWrap: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'baseline',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    marginBottom: 2,
    paddingBottom: 10
  },
  sections: {
    marginTop: 20,
    backgroundColor: '#fff',
    width: '100%',
    padding: 25
  },
  title: { fontSize: 18 },
  donateButton: {
    alignItems: 'center',
    width: '100%'
  },
  forcedMargin: {
    marginTop: 10
  }
});

export default DetailAboutUs;