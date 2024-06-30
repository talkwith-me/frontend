import { Dimensions } from 'react-native';

const isTablet = Dimensions.get('window').width > 800;

export default {
    isTablet
}
