import {ScrollView} from 'react-native-gesture-handler';
import {Appbar} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useForm, Controller} from 'react-hook-form';

import Input from '../components/Input';
import Button from '../components/Button';

const SignIn = props => {
  const {control, handleSubmit} = useForm({
    defaultValues: {
      email: null,
      firstName: null,
      lastName: null,
      address: null,
      password: null,
      confirmPassword: null,
    },
  });

  const submitHandler = data => {
    console.log(data);
  };

  return (
    <SafeAreaView>
      <Appbar>
        <Appbar.BackAction onPress={props.goBack} />
        <Appbar.Content title="Sign in to continue" />
      </Appbar>
      <ScrollView style={{padding: 16}}>
        <Controller
          control={control}
          name="email"
          render={({field}) => (
            <Input label="Email" required {...field} returnKeyType="next" />
          )}
        />
        <Controller
          control={control}
          name="firstName"
          render={({field}) => <Input label="First Name" required {...field} />}
        />

        <Controller
          control={control}
          name="lastName"
          render={({field}) => <Input label="Last Name" required {...field} />}
        />

        <Controller
          control={control}
          name="address"
          render={({field}) => <Input label="Address" required {...field} />}
        />

        <Controller
          control={control}
          name="password"
          render={({field}) => <Input label="Password" required {...field} />}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({field}) => (
            <Input label="Re type password" required {...field} />
          )}
        />

        <Button
          mode="contained"
          onPress={handleSubmit(submitHandler)}
          style={{marginTop: 16}}>
          Register
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
