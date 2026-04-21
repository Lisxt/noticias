import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

// Importando as funções do banco de dados que criamos no Passo 2
import { insertNoticia, getNoticias, deleteNoticia, updateNoticia, Noticia } from './database';

// ==========================================
// COMPONENTES REUTILIZÁVEIS
// ==========================================
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
    <NavButton title="Comentar" onPress={() => navigation.navigate('Comentar')} color="#27ae60" />
  </View>
);
export const ComentarScreen = () => <View style={styles.container}><Text style={styles.title}>Comentar</Text></View>;

// ==========================================
// 2. FLUXO DE LOGIN
// ==========================================
export const LoginScreen = ({ navigation }: any) => (
  <View style={styles.container}>
    <Text style={styles.title}>Login</Text>
    <NavButton title="Lembrar Senha" onPress={() => navigation.navigate('Lembrar')} color="#7f8c8d" />
    <View style={styles.divider} />
    <Text style={styles.subtitle}>Após logar, ir para:</Text>
    <NavButton title="Meu Perfil (AUTOR)" onPress={() => navigation.navigate('PerfilAutor')} color="#e74c3c" />
    <NavButton title="Meu Perfil (LEITOR)" onPress={() => navigation.navigate('PerfilLeitor')} color="#2ecc71" />
    <NavButton title="Painel (EDITOR)" onPress={() => navigation.navigate('PainelEditor')} color="#34495e" />
  </View>
);
export const LembrarScreen = () => <View style={styles.container}><Text style={styles.title}>Lembrar Senha</Text></View>;

// ==========================================
// 3. ÁREA DO AUTOR (CRUD COM BANCO DE DADOS)
// ==========================================
export const PerfilAutorScreen = ({ navigation }: any) => (
  <View style={styles.container}>
    <Text style={styles.title}>Meu Perfil (AUTOR)</Text>
    <NavButton title="Minhas Notícias" onPress={() => navigation.navigate('MinhasNoticias')} color="#e74c3c" />
  </View>
);

// TELA: LISTAR E DELETAR (READ & DELETE)
export const MinhasNoticiasScreen = ({ navigation }: any) => {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const isFocused = useIsFocused(); 

  const carregarDados = () => {
    const lista = getNoticias();
    setNoticias(lista);
  };

  useEffect(() => {
    if (isFocused) carregarDados();
  }, [isFocused]);

  const confirmarExclusao = (id: number) => {
    Alert.alert('Excluir', 'Deseja apagar esta notícia?', [
      { text: 'Não' },
      { text: 'Sim', onPress: () => { deleteNoticia(id); carregarDados(); } }
    ]);
  };

  return (
    <View style={styles.containerList}>
      <Text style={styles.title}>Minhas Notícias</Text>
      <NavButton title="+ Nova Notícia" onPress={() => navigation.navigate('NovaNoticia')} color="#2ecc71" />
      
      <FlatList
        data={noticias}
        keyExtractor={(item) => item.id.toString()}
        style={{ width: '100%' }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.titulo}</Text>
            <Text numberOfLines={2}>{item.conteudo}</Text>
            <View style={styles.cardActions}>
              <TouchableOpacity onPress={() => navigation.navigate('EditarNoticia', { noticia: item })}>
                <Text style={{ color: '#3498db', fontWeight: 'bold' }}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => confirmarExclusao(item.id)}>
                <Text style={{ color: '#e74c3c', fontWeight: 'bold' }}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

// TELA: CRIAR (CREATE)
export const NovaNoticiaScreen = ({ navigation }: any) => {
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');

  const salvar = () => {
    if (!titulo || !conteudo) return Alert.alert('Aviso', 'Preencha tudo!');
    insertNoticia(titulo, conteudo);
    navigation.goBack();
  };

  return (
    <View style={styles.containerForm}>
      <Text style={styles.title}>Criar Notícia</Text>
      <TextInput style={styles.input} placeholder="Título" value={titulo} onChangeText={setTitulo} />
      <TextInput style={[styles.input, { height: 120 }]} placeholder="Conteúdo" multiline value={conteudo} onChangeText={setConteudo} />
      <NavButton title="Publicar" onPress={salvar} color="#27ae60" />
    </View>
  );
};

// TELA: EDITAR (UPDATE)
export const EditarNoticiaScreen = ({ route, navigation }: any) => {
  const { noticia } = route.params;
  const [titulo, setTitulo] = useState(noticia.titulo);
  const [conteudo, setConteudo] = useState(noticia.conteudo);

  const atualizar = () => {
    updateNoticia(noticia.id, titulo, conteudo);
    navigation.goBack();
  };

  return (
    <View style={styles.containerForm}>
      <Text style={styles.title}>Editar Notícia</Text>
      <TextInput style={styles.input} placeholder="Título" value={titulo} onChangeText={setTitulo} />
      <TextInput style={[styles.input, { height: 120 }]} placeholder="Conteúdo" multiline value={conteudo} onChangeText={setConteudo} />
      <NavButton title="Salvar Alterações" onPress={atualizar} color="#f39c12" />
    </View>
  );
};

// ==========================================
// 4. ÁREA DO LEITOR E EDITOR (ESTÁTICOS)
// ==========================================
export const PerfilLeitorScreen = () => <View style={styles.container}><Text style={styles.title}>Meu Perfil (LEITOR)</Text></View>;

export const PainelEditorScreen = ({ navigation }: any) => (
  <View style={styles.container}>
    <Text style={styles.title}>Painel (EDITOR)</Text>
    <NavButton title="Publicar / Despublicar" onPress={() => navigation.navigate('PublicarDespublicar')} color="#34495e" />
    <NavButton title="Editar Qualquer Notícia" onPress={() => navigation.navigate('EditarQualquerNoticia')} color="#34495e" />
    <NavButton title="Meu Perfil" onPress={() => navigation.navigate('PerfilEditor')} color="#34495e" />
  </View>
);
export const PublicarDespublicarScreen = () => <View style={styles.container}><Text style={styles.title}>Publicar / Despublicar</Text></View>;
export const EditarQualquerNoticiaScreen = () => <View style={styles.container}><Text style={styles.title}>Moderação</Text></View>;
export const PerfilEditorScreen = () => <View style={styles.container}><Text style={styles.title}>Meu Perfil (EDITOR)</Text></View>;

// ==========================================
// ESTILOS
// ==========================================
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f5f6fa' },
  containerList: { flex: 1, padding: 20, backgroundColor: '#f5f6fa' },
  containerForm: { flex: 1, padding: 20, backgroundColor: '#f5f6fa', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#2c3e50', textAlign: 'center' },
  subtitle: { fontSize: 16, marginBottom: 15, color: '#7f8c8d' },
  divider: { height: 20 },
  button: { width: '100%', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 12 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 15, borderWidth: 1, borderColor: '#ddd' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 15, elevation: 2 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  cardActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 20, marginTop: 10 }
});