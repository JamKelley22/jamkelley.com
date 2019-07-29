import React from "react";
import { Language, Theme } from "../constants/enum";

const initLanguage = Language.English;
const initTheme = Theme.Light;

interface AppContextInterface {
  lang: Language;
  theme: Theme;
}

const { AppContextProvider, AppContextConsumer } = React.createContext<
  AppContextInterface
>({
  lang: initLanguage,
  theme: initTheme
});

interface IAppProviderProps {}

interface IAppProviderState {
  lang: Language;
  theme: Theme;
}

class AppProvider extends React.Component<
  IAppProviderProps,
  IAppProviderState
> {
  state: IAppProviderState = {
    lang: initLanguage,
    theme: initTheme
  };

  updateLanguage = (newLanguage: Language) => {
    this.setState({
      lang: newLanguage
    });
  };

  updateTheme = (newTheme: Theme) => {
    this.setState({
      theme: newTheme
    });
  };

  render() {
    return <AppContextProvider />;
  }
}

export { AppProvider };
