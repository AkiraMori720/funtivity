import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ThemeContext } from '../theme';
import {
	outsideHeader, themedHeader, StackAnimation
} from '../utils/navigation';
import {createDrawerNavigator} from "@react-navigation/drawer";
import * as HeaderButton from '../containers/HeaderButton';

import SidebarView from "../views/SidebarView";
import SettingView from "../views/SettingView";
import NotificationView from "../views/NotificationView";
import MessageView from "../views/MessageView";
import SearchView from "../views/SearchView";
import FriendView from "../views/FriendView";
import ProfileView from "../views/ProfileView";
import HomeView from "../views/HomeView";
import ThemeView from "../views/ThemeView";
import ProfileEditView from "../views/ProfileEditView";
import AccountView from "../views/AccountView";
import ChatView from "../views/ChatView";
import AboutView from "../views/AboutView";
import AddMeetupView from "../views/AddMeetupView";
import MyMeetupView from "../views/MyMeetupView";


// Outside
const Inside = createStackNavigator();
const InsideStack = () => {
	const { theme } = React.useContext(ThemeContext);

	return (
		<Inside.Navigator screenOptions={{ ...outsideHeader, ...themedHeader(theme), ...StackAnimation }}>
			<Inside.Screen
				name='Home'
				component={HomeView}
				options={({navigation}) => ({
					title: 'Funtivity',
					headerLeft: () => <HeaderButton.Drawer navigation={navigation} testID='rooms-list-view-sidebar' />,
				})}
			/>
			<Inside.Screen
				name='Profile'
				component={ProfileView}
				options={({navigation}) => ({
					title: 'Profile',
					headerLeft: () => <HeaderButton.Drawer navigation={navigation} testID='rooms-list-view-sidebar' />,
					headerRight: () => <HeaderButton.ProfilePreferences navigation={navigation} testID='rooms-list-view-sidebar' />,
				})}
			/>
			<Inside.Screen
				name='Friend'
				component={FriendView}
				options={({navigation}) => ({
					title: 'Friend',
					headerLeft: () => <HeaderButton.Drawer navigation={navigation} testID='rooms-list-view-sidebar' />,
				})}
			/>
			<Inside.Screen
				name='Search'
				component={SearchView}
				options={({navigation}) => ({
					title: 'Search',
					headerLeft: () => <HeaderButton.Drawer navigation={navigation} testID='rooms-list-view-sidebar' />,
				})}
			/>
			<Inside.Screen
				name='Message'
				component={MessageView}
				options={({navigation}) => ({
					title: 'Messages',
					headerLeft: () => <HeaderButton.Drawer navigation={navigation} testID='rooms-list-view-sidebar' />,
				})}
			/>
			<Inside.Screen
				name='Notification'
				component={NotificationView}
				options={({navigation}) => ({
					title: 'Notifications',
					headerLeft: () => <HeaderButton.Drawer navigation={navigation} testID='rooms-list-view-sidebar' />,
				})}
			/>
			<Inside.Screen
				name='Setting'
				component={SettingView}
				options={({navigation}) => ({
					title: 'Settings',
					headerLeft: () => <HeaderButton.Drawer navigation={navigation} testID='rooms-list-view-sidebar' />,
				})}
			/>
			<Inside.Screen
				name='Account'
				component={AccountView}
			/>
			<Inside.Screen
				name='ProfileEdit'
				component={ProfileEditView}
				options={ProfileEditView.navigationOptions}
			/>
			<Inside.Screen
				name='Theme'
				component={ThemeView}
				options={ThemeView.navigationOptions}
			/>
			<Inside.Screen
				name='Chat'
				component={ChatView}
			/>
			<Inside.Screen
				name='About'
				component={AboutView}
			/>
			<Inside.Screen
				name='MyMeetup'
				component={MyMeetupView}
			/>
			<Inside.Screen
				name='AddMeetup'
				component={AddMeetupView}
				options={AddMeetupView.navigationOptions}
			/>
		</Inside.Navigator>
	);
};

const Drawer = createDrawerNavigator();
const DrawerNavigator = () => (
	<Drawer.Navigator
		drawerContent={({ navigation, state }) => <SidebarView navigation={navigation} state={state} />}
		screenOptions={{ swipeEnabled: true }}
		drawerType='back'
	>
		<Drawer.Screen name='ChatsStack' component={InsideStack} />
	</Drawer.Navigator>
)

export default DrawerNavigator;
