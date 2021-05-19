import React from 'react';
import WebModal from 'modal-react-native-web';
import {Modal as AppModal} from 'react-native';
import { Platform } from 'react-native';

const Modal = (props) => {
    if (Platform.OS === 'web') {
        return (
            <WebModal {...props}>
                {props.children}
            </WebModal>
        );
    } else {
        return (
            <AppModal {...props}>
                {props.children}
            </AppModal>
        );
    }
}

export default Modal;