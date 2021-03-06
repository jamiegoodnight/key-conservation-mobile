import React from 'react';
import { SvgXml } from 'react-native-svg';

export default function CheckInactive() {
	const checkInactive = `

    <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="13.5" cy="13.5" r="13.5" fill="white"/>
    <path d="M27 13.5C27 20.9559 20.9559 27 13.5 27C6.04414 27 0 20.9559 0 13.5C0 6.04414 6.04414 0 13.5 0C20.9559 0 27 6.04414 27 13.5ZM11.9385 20.6481L21.9546 10.632C22.2947 10.2919 22.2947 9.74041 21.9546 9.4003L20.7229 8.16859C20.3828 7.82842 19.8313 7.82842 19.4911 8.16859L11.3226 16.3371L7.50888 12.5234C7.16877 12.1833 6.61729 12.1833 6.27712 12.5234L5.04541 13.7551C4.70529 14.0952 4.70529 14.6467 5.04541 14.9868L10.7067 20.6481C11.0469 20.9883 11.5983 20.9883 11.9385 20.6481V20.6481Z" fill="#F0F0F9"/>
    </svg>`;

	const CheckInactive = () => <SvgXml xml={checkInactive} width='26' height='26' />;

	return <CheckInactive />;
}
