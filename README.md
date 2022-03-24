# @newbanker/react-native-measure-text

https://github.com/Damoness

## Installation

```sh
npm install @newbanker/react-native-measure-text
```

## Usage

```javascript
import MeasureText from 'react-native-measure-text';

const texts = [
  'This is an example',
  'This is the second line'
];
const width = 100;
const fontSize = 15;
const fontFamily = 'Arvo';

class Test extends Component {
  state = {
    heights: [],
  }
  async componentDidMount() {
    const heights = await MeasureText.heights({(
      texts, /* texts to measure */
      width, /* container width */
      fontSize,
      fontFamily /* fontFamily is optional! */
    );
    this.setState({ heights });
  }
  render() {
    const { heights } = this.state;
    return (
      <View>
        {texts.map((text, i) => (
          <Text
            key={`text-${i}`}
            style={{
              width,
              fontSize,
              fontFamily,
              height: heights[i],
            }}
          >
            {text}
          </Text>
        ))}
    </View>
  }
}
```

## API

`MeasureText.heights(options)`

Returns a promise that resolves to all the heights of the texts passed in options.

`MeasureText.widths(options)`

Returns a promise that resolves to all the widths of the texts passed in options.

Measure options:

* `texts`: An array of texts to measure.
* `width`: Container width when you want to measure the height.
* `height`: Container height when you want to measure the width.
* `fontSize`: The size of the font.
* `fontFamily`: The name of a _custom_ font or a _preinstalled_ font. This is optional.
* `fontWeight`: Specifies font weight. The values are the same that React Native allows: `enum('normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900')`



## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
