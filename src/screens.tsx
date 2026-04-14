import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Criamos um botão personalizado para ficar mais bonito e fácil de clicar
const NavButton = ({ title, onPress, color = '#333' }: any) => (
  <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

// ==========================================
// 1. HOME E NAVEGAÇÃO PRINCIPAL
// ==========================================
export const HomeScreen = ({ navigation }: any) => (
  <View style={styles.container}>
    <Text style={styles.title}>Home - Lista de Notícias</Text>
    
    {/* Setas saindo da Home de acordo com o fluxograma: */}
    <NavButton title="Ir para Cadastro" onPress={() => navigation.navigate('Cadastro')} color="#4a90e2" />
    <NavButton title="Busca por UF" onPress={() => navigation.navigate('BuscaUF')} color="#4a90e2" />
    <NavButton title="Busca por Tag" onPress={() => navigation.navigate('BuscaTag')} color="#4a90e2" />
    <NavButton title="Fazer Login" onPress={() => navigation.navigate('Login')} color="#f39c12" />
    <NavButton title="Detalhe da Notícia" onPress={() => navigation.navigate('DetalheNoticia')} color="#9b59b6" />
  </View>
);

export const CadastroScreen = () => <View style={styles.container}><Text style={styles.title}>Cadastro</Text></View>;
export const BuscaUFScreen = () => <View style={styles.container}><Text style={styles.title}>Busca por UF</Text></View>;
export const BuscaTagScreen = () => <View style={styles.container}><Text style={styles.title}>Busca por Tag</Text></View>;

export const DetalheNoticiaScreen = ({ navigation }: any) => (
  <View style={styles.container}>
    <Text style={styles.title}>Detalhe da Notícia</Text>
    {/* A seta do detalhe da notícia vai para Comentar */}
    <NavButton title="Comentar" onPress={() => navigation.navigate('Comentar')} color="#27ae60" />
  </View>
);
export const ComentarScreen = () => <View style={styles.container}><Text style={styles.title}>Comentar</Text></View>;


// ==========================================
// 2. FLUXO DE LOGIN (O "cruzamento" de rotas)
// ==========================================
export const LoginScreen = ({ navigation }: any) => (
  <View style={styles.container}>
    <Text style={styles.title}>Login</Text>
    
    {/* Seta do Lembrar sai do Login */}
    <NavButton title="Lembrar Senha" onPress={() => navigation.navigate('Lembrar')} color="#7f8c8d" />
    
    <View style={styles.divider} />
    <Text style={styles.subtitle}>Após logar, ir para:</Text>
    
    {/* As 3 setas que descem para os perfis */}
    <NavButton title="Meu Perfil (AUTOR)" onPress={() => navigation.navigate('PerfilAutor')} color="#e74c3c" />
    <NavButton title="Meu Perfil (LEITOR)" onPress={() => navigation.navigate('PerfilLeitor')} color="#2ecc71" />
    <NavButton title="Painel (EDITOR)" onPress={() => navigation.navigate('PainelEditor')} color="#34495e" />
  </View>
);
export const LembrarScreen = () => <View style={styles.container}><Text style={styles.title}>Lembrar Senha</Text></View>;


// ==========================================
// 3. ÁREA DO AUTOR
// ==========================================
export const PerfilAutorScreen = ({ navigation }: any) => (
  <View style={styles.container}>
    <Text style={styles.title}>Meu Perfil (AUTOR)</Text>
    {/* Seta do Meu Perfil vai para Minhas Noticias */}
    <NavButton title="Minhas Notícias" onPress={() => navigation.navigate('MinhasNoticias')} color="#e74c3c" />
  </View>
);

export const MinhasNoticiasScreen = ({ navigation }: any) => (
  <View style={styles.container}>
    <Text style={styles.title}>Minhas Notícias</Text>
    {/* Setas de Minhas Noticias vão para Nova e Editar */}
    <NavButton title="Nova Notícia" onPress={() => navigation.navigate('NovaNoticia')} color="#e74c3c" />
    <NavButton title="Editar Notícia" onPress={() => navigation.navigate('EditarNoticia')} color="#e74c3c" />
  </View>
);
export const NovaNoticiaScreen = () => <View style={styles.container}><Text style={styles.title}>Criar Nova Notícia</Text></View>;
export const EditarNoticiaScreen = () => <View style={styles.container}><Text style={styles.title}>Editar Notícia</Text></View>;


// ==========================================
// 4. ÁREA DO LEITOR
// ==========================================
export const PerfilLeitorScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Meu Perfil (LEITOR)</Text>
  </View>
);


// ==========================================
// 5. ÁREA DO EDITOR
// ==========================================
export const PainelEditorScreen = ({ navigation }: any) => (
  <View style={styles.container}>
    <Text style={styles.title}>Painel (EDITOR)</Text>
    {/* Setas do Painel vão para Publicar, Editar e Perfil */}
    <NavButton title="Publicar / Despublicar" onPress={() => navigation.navigate('PublicarDespublicar')} color="#34495e" />
    <NavButton title="Editar Qualquer Notícia" onPress={() => navigation.navigate('EditarQualquerNoticia')} color="#34495e" />
    <NavButton title="Meu Perfil" onPress={() => navigation.navigate('PerfilEditor')} color="#34495e" />
  </View>
);
export const PublicarDespublicarScreen = () => <View style={styles.container}><Text style={styles.title}>Publicar / Despublicar</Text></View>;
export const EditarQualquerNoticiaScreen = () => <View style={styles.container}><Text style={styles.title}>Editar Qualquer Notícia</Text></View>;
export const PerfilEditorScreen = () => <View style={styles.container}><Text style={styles.title}>Meu Perfil (EDITOR)</Text></View>;

// ==========================================
// ESTILOS
// ==========================================
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f5f6fa' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 30, color: '#2c3e50' },
  subtitle: { fontSize: 16, marginBottom: 15, color: '#7f8c8d' },
  divider: { height: 30 },
  button: { width: '100%', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 12 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});