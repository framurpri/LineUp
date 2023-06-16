import React, {useState} from "react";
import { Text, View, TouchableHighlight } from "react-native";
import Circulo from "./Circulo";

function upButton(props) {
    
    const {width, height, children, name, onStateChange} = props;

    const [state, setState] = useState(false);

    const handleClick = () => {
        onStateChange(name);
    };

    const handleCursorEnter = () => {
        setState(!state);
      };
    
      const handleCursorLeave = () => {
        setState(!state);
      };

    return(
        <View>
            <View style={{backgroundColor:'#C0C0C0',  
            borderRadius: 5,
            marginBottom: 5,
            width: width,
            height: height,
            alignItems: 'center',
            alignContent: 'center', 
            opacity: state ? 1 : 0
            }}>
                <Text style={{fontWeight: 'bold'}}>{children}</Text>
            </View>
            <View>
                <TouchableHighlight
                    onMouseEnter={handleCursorEnter}
                    onMouseLeave={handleCursorLeave}
                    onTouchStart={handleClick}
                >
                    <Circulo margin={0} width={54} marginTop={12} size={20} marginT={0}>
                        <Text>{name}</Text>
                    </Circulo>
                </TouchableHighlight>
            </View>
        </View>
    )
}

export default upButton;
