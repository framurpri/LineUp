    class MovingElement extends Component {
        constructor(props) {
        super(props);
    
        this.state = {
            position: new Animated.ValueXY({x: 0, y: 0})
        };
        }
    
        render() {
        return (
            <Animated.View style={this.state.position.getLayout()}>
            {this.props.children}
            </Animated.View>
        );
        }
    }

    moveElement = (x, y) => {
        Animated.spring(this.state.position, {
        toValue: {x, y},
        useNativeDriver: true
        }).start();
    };

    class App extends Component {
        render() {
        return (
            <View style={styles.container}>
            <MovingElement>
                <Text>Mi elemento móvil</Text>
            </MovingElement>
            <Button
                title="Mover"
                onPress={() => this.refs.movingElement.moveElement(100, 100)}
            />
            </View>
        );
        }
    };
  
  
  
  
  