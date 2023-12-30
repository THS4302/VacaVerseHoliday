// custom.d.ts
//thet htar san
interface Window {
    gapi: {
      load: (library: string, callback: () => void) => void;
      auth2: {
        init: (config: { client_id: string}) => Promise<any>;
        getAuthInstance: () => {
          isSignedIn: { listen: (callback: (isSignedIn: boolean) => void) => void };
          currentUser: { get: () => { getAuthResponse: () => { id_token: string } } };
          signIn: () => void;
        };
      };
    };
  }
  