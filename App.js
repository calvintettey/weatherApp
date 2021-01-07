import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
} from "react-native";

const Sc_Height = Dimensions.get("screen").height;
const Sc_Width = Dimensions.get("screen").width;

// const [loaded] = useFonts({
//   Montserrat: require('./assets/fonts/Montserrat.ttf'),
// });

// if (!loaded) {
//   return null;
// }

import Icon from "react-native-vector-icons/AntDesign";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      temp: "",
      city: "Accra",
      icon: "",
      city_display: "",
      desc: "",
      main: "",
      humidity: "",
      pressure: "",
      visiblity: "",
    };
    this.fetch_weather();
  }

  fetch_weather = () => {
    fetch(
      "http://api.openweathermap.org/data/2.5/weather?q=" +
        this.state.city +
        "&appid=1f0fde91c22f10bdd2e0ba830e2e2ec7"
    )
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json });
        this.setState({ temp: (json.main.temp - 273.15).toFixed(2) + " °C" });
        this.setState({ city_display: json.name });
        this.setState({ icon: json.weather[0].icon });
        this.setState({ desc: json.weather[0].description });
        this.setState({ main: json.weather[0].main });
        this.setState({ humidity: json.main.humidity + " %" });
        this.setState({ pressure: json.main.pressure + " hPa" });
        this.setState({
          visibility: (json.visibility / 1000).toFixed(2) + " Km",
        });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={require("./assets/bkgimage2.jpg")}
          style={styles.imageBackground}
        >
          <View style={styles.searchBarView}>
            <TextInput
              placeholder="Search"
              placeholderTextColor="#FFF"
              style={styles.searchBar}
              onChangeText={(text) => this.setState({ city: text })}
            />
            <TouchableOpacity
              style={styles.buttonTouch}
              onPress={this.fetch_weather}
            >
              <Icon name="search1" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.weatherBoxMain}>
            <View style={styles.weatherHolderView}>
              <Image
                tintColor="#FFF"
                source={{
                  uri:
                    "http://openweathermap.org/img/wn/" +
                    this.state.icon +
                    "@2x.png",
                }}
                style={styles.weatherImage}
              />
              <View>
                <Text style={styles.temperatureText}>{this.state.temp}</Text>
                <Text style={styles.cityText}>{this.state.city_display}</Text>
              </View>
            </View>
          </View>

          <View style={styles.infoBoxView}>
            <View style={styles.infoHolderView}>
              <Text style={styles.mainWeatherText}>{this.state.main}</Text>
              <Text style={styles.descriptionText}>{this.state.desc}</Text>
              <Text style={styles.humidityText}>
                Humidity : {this.state.humidity}
              </Text>
              <Text style={styles.otherText}>
                Pressure : {this.state.pressure}
              </Text>
              <Text style={styles.otherText}>
                Visibility : {this.state.visibility}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Sc_Height,
    width: Sc_Width,
  },
  imageBackground: {
    height: "100%",
    width: "100%",
  },
  searchBarView: {
    height: "20%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 17,
  },
  searchBar: {
    height: "28%",
    width: "85%",
    borderColor: "#FFF",
    borderWidth: 1,
    borderRadius: 15,
    color: "#FFF",
    paddingHorizontal: 15,
  },
  buttonTouch: {
    marginLeft: "5%",
    height: "35%",
    width: "8%",
    justifyContent: "center",
    alignItems: "center",
  },
  weatherBoxMain: {
    height: "30%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  weatherHolderView: {
    height: "80%",
    width: "90%",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 15,
    alignItems: "center",
    flexDirection: "row",
  },
  weatherImage: {
    height: "80%",
    width: "50%",
  },
  temperatureText: {
    fontSize: 30,
    color: "#FFF",
    marginLeft: "5%",
  },
  cityText: {
    fontSize: 20,
    color: "#FFF",
    marginLeft: "5%",
    marginTop: "3%",
  },
  infoBoxView: {
    height: "45%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  infoHolderView: {
    height: "80%",
    width: "90%",
    backgroundColor: "rgba(255, 255, 255, 0.62)",
    borderRadius: 15,
  },
  mainWeatherText: {
    fontSize: 28,
    color: "#464646",
    marginLeft: "8%",
    marginTop: "10%",
    // fontWeight: "bold",
    fontFamily: "sans-serif-light",

  },
  descriptionText: {
    fontSize: 25,
    color: "#464647",
    marginLeft: "8%",
    marginTop: "5%",
    fontFamily: "sans-serif-medium",
  },
  humidityText: {
    fontSize: 15,
    color: "#464647",
    marginLeft: "8%",
    marginTop: "10%",
    fontFamily: "sans-serif-medium",
  },
  otherText: {
    fontSize: 15,
    color: "#464647",
    marginLeft: "8%",
    marginTop: "4%",
    fontFamily: "sans-serif-medium",
  },
});
