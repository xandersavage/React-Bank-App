import { SignupFormValues } from '../types/auth';
import ApiService from './api';
import { supabase } from './supabaseClient';

export class AuthService {
  static async signUp(values: SignupFormValues) {
    // 1. Authenticate with Supabase
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        // emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          first_name: values.firstName,
          last_name: values.lastName,
        },
      },
    });

    if (error) {
      throw error;
    }

    if (!data.user) {
      throw new Error('User creation failed');
    }

    try {
      // 2. Create user profile in database
      const profileData = {
        ...values,
        supabaseUserId: data.user.id,
      };
      delete profileData.password;
      delete profileData.confirmPassword;

      await ApiService.signUp(profileData);

      return { user: data.user, session: data.session };
    } catch (error) {
      // If profile creation fails, we should clean up the Supabase user
      await supabase.auth.signOut();
      throw error;
    }
  }

  static async resendVerificationEmail(email: string) {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
    });

    if (error) {
      throw error;
    }
  }
}
