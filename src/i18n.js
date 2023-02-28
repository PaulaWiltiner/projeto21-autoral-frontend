import i18next from "i18next";
import I18NextVue from "i18next-vue";
import LanguageDetector from "i18next-browser-languagedetector";

i18next
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "en",
    resources: {
      en: {
        translation: {
          login: "Login",
          email: "E-mail",
          password: "Password",
          clear: "CLEAR",
          submit: "SUBMIT",
          name: "Name",
          signup: "Sign Up",
          logout: "Logout ",
          errorEmail: "Must be a valid e-mail",
          errorPassword: "Min 4 characters",
          errorName: "Name needs to be at least 2 characters",
          errorLoginEmail: "Cannot find user",
          errorLoginPassword: "Incorrect password",
          errorSignUpEmail: "Email already exists",
          discNote: "Write here...",
          myNotes: "My Notes",
          letsnote: "Let's Note",
          hello: "Hello",
          addNote: "Add Note",
          noTitle: "No Title",
        },
      },
      pt: {
        translation: {
          login: "Entrar",
          email: "E-mail",
          password: "Senha",
          clear: "LIMPAR",
          submit: "ENVIAR",
          name: "Nome",
          signup: "Cadastrar-se",
          logout: "Sair ",
          errorEmail: "Deve ser um e-mail válido",
          errorPassword: "Mínimo 4 caracteres",
          errorName: "O nome precisa ter pelo menos 2 caracteres",
          errorLoginEmail: "Não foi possível encontrar o usuário",
          errorLoginPassword: "Senha incorreta",
          errorSignUpEmail: "E-mail já existe",
          discNote: "Escreva aqui...",
          myNotes: "Minhas Notas",
          letsnote: "Vamos anotar",
          hello: "Olá",
          addNote: "Adicionar Nota",
          noTitle: "Sem Título",
        },
      },
      es: {
        translation: {
          login: "Iniciar Sesión",
          email: "Correo electrónico",
          password: "Contraseña",
          clear: "BORRAR",
          submit: "ENVIAR",
          name: "Nombre",
          signup: "Registrarse",
          logout: "Salir",
          errorEmail: "Debe ser un correo electrónico válido",
          errorPassword: "Mínimo 4 caracteres",
          errorName: "El nombre debe tener al menos 2 caracteres",
          errorLoginEmail: "No se pudo encontrar el usuario",
          errorLoginPassword: "Contraseña incorrecta",
          errorSignUpEmail: "El correo electrónico ya existe",
          discNote: "Escribe aquí...",
          myNotes: "Mis Notas",
          letsnote: "Vamos a escribirlo",
          hello: "Hola",
          addNote: "Añadir Nota",
          noTitle: "Sin título",
        },
      },
      fr: {
        translation: {
          login: "Connexion",
          email: "E-mail",
          password: "Mot de passe",
          clear: "CLAIR",
          submit: "ENVOYER",
          name: "Nom",
          signup: "S'inscrire",
          logout: "Déconnexion",
          errorEmail: "Doit être un e-mail valide",
          errorPassword: "Minimum 4 caractères",
          errorName: "Le nom doit comporter au moins 2 caractères",
          errorLoginEmail: "Impossible de trouver l'utilisateur",
          errorLoginPassword: "Mot de passe incorrect",
          errorSignUpEmail: "L'e-mail existe déjà",
          discNote: "Écrivez ici...",
          myNotes: "Mes Notes",
          letsnote: "Écrivons-le",
          hello: "Bonjour",
          addNote: "Ajouter une note",
          noTitle: "Sans titre",
        },
      },
    },
  });

export default function (app) {
  app.use(I18NextVue, { i18next });
  return app;
}
