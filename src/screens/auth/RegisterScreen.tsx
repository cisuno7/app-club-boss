import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { colors, spacing, typography } from '@/theme';
import { UserRole } from '@/types';

interface RegisterStep {
  step: number;
  title: string;
  fields: string[];
}

export const RegisterScreen: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'client' as UserRole,
    companyName: '',
    phone: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const steps: RegisterStep[] = [
    { step: 1, title: 'Dados pessoais', fields: ['name', 'email'] },
    { step: 2, title: 'Segurança', fields: ['password', 'confirmPassword'] },
    { step: 3, title: 'Tipo de conta', fields: ['role'] },
  ];

  const currentStepData = steps[currentStep - 1];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      handleRegister();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRegister = async () => {
    setIsLoading(true);
    // Simula registro
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    // Na implementação real, aqui faria o registro
  };

  const isStepValid = () => {
    if (currentStep === 1) {
      return formData.name && formData.email;
    }
    if (currentStep === 2) {
      return formData.password && formData.password === formData.confirmPassword;
    }
    return true;
  };

  const roles: UserRole[] = ['client', 'company', 'admin', 'select'];

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={styles.stepIndicator}>
              Passo {currentStep} de {steps.length}
            </Text>
            <Text style={styles.title}>{currentStepData.title}</Text>
          </View>

          <View style={styles.form}>
            {currentStep === 1 && (
              <>
                <Input
                  label="Nome completo"
                  placeholder="Seu nome"
                  value={formData.name}
                  onChangeText={(text) => setFormData({ ...formData, name: text })}
                  autoCapitalize="words"
                />
                <Input
                  label="Email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChangeText={(text) => setFormData({ ...formData, email: text })}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
              </>
            )}

            {currentStep === 2 && (
              <>
                <Input
                  label="Senha"
                  placeholder="••••••••"
                  value={formData.password}
                  onChangeText={(text) => setFormData({ ...formData, password: text })}
                  secureTextEntry
                  autoCapitalize="none"
                />
                <Input
                  label="Confirmar senha"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                  secureTextEntry
                  autoCapitalize="none"
                  error={
                    formData.confirmPassword &&
                    formData.password !== formData.confirmPassword
                      ? 'As senhas não coincidem'
                      : undefined
                  }
                />
              </>
            )}

            {currentStep === 3 && (
              <View style={styles.roleSelector}>
                <Text style={styles.roleLabel}>Selecione o tipo de conta:</Text>
                <View style={styles.roleButtons}>
                  {roles.map((role) => (
                    <Button
                      key={role}
                      title={role.charAt(0).toUpperCase() + role.slice(1)}
                      onPress={() => setFormData({ ...formData, role })}
                      variant={formData.role === role ? 'primary' : 'secondary'}
                      size="medium"
                      style={styles.roleButton}
                    />
                  ))}
                </View>
              </View>
            )}

            <View style={styles.buttons}>
              {currentStep > 1 && (
                <Button
                  title="Voltar"
                  onPress={handleBack}
                  variant="secondary"
                  style={styles.backButton}
                />
              )}
              <Button
                title={currentStep === steps.length ? 'Finalizar cadastro' : 'Próximo'}
                onPress={handleNext}
                loading={isLoading}
                disabled={!isStepValid()}
                fullWidth={currentStep === 1}
                style={styles.nextButton}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.lg,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  stepIndicator: {
    fontSize: typography.small.fontSize,
    color: colors.gray[700],
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: typography.h2.fontSize,
    fontWeight: typography.fontWeight.bold as '700',
    color: colors.gray[900],
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  roleSelector: {
    marginBottom: spacing.lg,
  },
  roleLabel: {
    fontSize: typography.body.fontSize,
    color: colors.gray[900],
    marginBottom: spacing.md,
  },
  roleButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  roleButton: {
    flex: 1,
    minWidth: '45%',
  },
  buttons: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  backButton: {
    flex: 1,
  },
  nextButton: {
    flex: currentStep === 1 ? 1 : 2,
  },
});
