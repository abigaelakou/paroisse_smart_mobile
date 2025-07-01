/**
 * @description      :
 * @author           : AbigaelHOMENYA
 * @group            :
 * @created          : 22/05/2025 - 18:30:32
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 22/05/2025
 * - Author          : AbigaelHOMENYA
 * - Modification    :
 **/
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Image,
  RefreshControl,
  StyleSheet,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import {
  ActivityIndicator,
  Card,
  Text,
  Title,
  Paragraph,
  Avatar,
  IconButton,
  useTheme,
} from "react-native-paper";
import Animated, { FadeIn } from "react-native-reanimated";
import { fetchHomeData } from "../services/HomeService";

// Activer LayoutAnimation sur Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const getRandomVerse = () => {
  const verses = [
    "“Je puis tout par celui qui me fortifie.” — Philippiens 4:13",
    "“L'Éternel est mon berger: je ne manquerai de rien.” — Psaume 23:1",
    "“Heureux ceux qui ont faim et soif de la justice, car ils seront rassasiés.” — Matthieu 5:6",
    "“Ne crains point, car je suis avec toi.” — Esaïe 41:10",
  ];
  return verses[Math.floor(Math.random() * verses.length)];
};

const HomeScreen = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [nouvelles, setNouvelles] = useState([]);
  const [annonces, setAnnonces] = useState([]);
  const [pain, setPain] = useState(null);
  const [error, setError] = useState(null);
  const [citation, setCitation] = useState(getRandomVerse());

  const LeftIcon = (icon) => (props) =>
    (
      <Avatar.Icon
        {...props}
        icon={icon}
        style={{ backgroundColor: "#228B22" }}
      />
    );

  const loadData = async () => {
    try {
      setError(null);
      const data = await fetchHomeData();
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setNouvelles(data.nouvelles || []);
      setAnnonces(data.annonces || []);
      setPain(data.pain || null);
    } catch (err) {
      console.error(err);
      setError("Erreur lors du chargement des données.");
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setCitation(getRandomVerse());
    await loadData();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    const start = async () => {
      setLoading(true);
      await loadData();
      setLoading(false);
    };
    start();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator animating={true} color="#228B22" size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#228B22"]}
        />
      }
    >
      <Animated.View entering={FadeIn.duration(800)}>
        {/* Bannière */}
        <Image
          source={require("../../assets/banner.jpg")}
          style={styles.banner}
          resizeMode="cover"
        />

        {/* En-tête */}
        <View style={styles.headerContainer}>
          <Title style={styles.headerTitle}>
            Bienvenue dans Paroisse Smart 👋
          </Title>
          <IconButton icon="refresh" size={20} onPress={onRefresh} />
        </View>

        {/* Citation */}
        <Card style={styles.quoteCard}>
          <Card.Content>
            <Paragraph style={styles.quoteText}>{citation}</Paragraph>
          </Card.Content>
        </Card>

        {/* Pain du jour */}
        <Card style={styles.card}>
          <Card.Title
            title="🍞 Pain du jour"
            left={LeftIcon("book-open-page-variant")}
          />
          <Card.Content>
            {pain ? (
              <>
                <Title style={styles.cardTitle}>{pain.titre}</Title>
                <Paragraph>{pain.contenu}</Paragraph>
                <Text style={styles.dateText}>📅 {pain.date_pain}</Text>
              </>
            ) : (
              <Paragraph style={styles.emptyText}>
                Aucun message pour aujourd’hui.
              </Paragraph>
            )}
          </Card.Content>
        </Card>

        {/* Nouvelles */}
        <Card style={styles.card}>
          <Card.Title
            title="📰 Dernières nouvelles"
            left={LeftIcon("newspaper-variant-outline")}
          />
          <Card.Content>
            {nouvelles.length === 0 ? (
              <Paragraph style={styles.emptyText}>
                Aucune nouvelle disponible.
              </Paragraph>
            ) : (
              nouvelles.map((item) => (
                <Card key={item.id} style={styles.subCard}>
                  {item.image_url && (
                    <Image
                      source={{ uri: item.image_url }}
                      style={styles.image}
                      resizeMode="cover"
                    />
                  )}
                  <Card.Content>
                    <Title style={styles.itemTitle}>{item.titre}</Title>
                    <Paragraph>{item.contenu}</Paragraph>
                  </Card.Content>
                </Card>
              ))
            )}
          </Card.Content>
        </Card>

        {/* Annonces */}
        <Card style={styles.card}>
          <Card.Title
            title="📢 Annonces de la semaine"
            left={LeftIcon("bullhorn-outline")}
          />
          <Card.Content>
            {annonces.length === 0 ? (
              <Paragraph style={styles.emptyText}>
                Aucune annonce disponible.
              </Paragraph>
            ) : (
              annonces.map((item) => (
                <Card key={item.id} style={styles.subCard}>
                  {item.image_url && (
                    <Image
                      source={{ uri: item.image_url }}
                      style={styles.image}
                      resizeMode="cover"
                    />
                  )}
                  <Card.Content>
                    <Title style={styles.itemTitle}>{item.titre}</Title>
                    <Paragraph>{item.contenu}</Paragraph>
                  </Card.Content>
                </Card>
              ))
            )}
          </Card.Content>
        </Card>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4F7FE",
    padding: 16,
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  banner: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 12,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#228B22",
  },
  quoteCard: {
    backgroundColor: "#E7F4E4",
    marginBottom: 16,
    borderRadius: 12,
  },
  quoteText: {
    fontStyle: "italic",
    textAlign: "center",
    fontSize: 15,
    color: "#2F3C7E",
  },
  card: {
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  subCard: {
    marginVertical: 8,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#FAFAFA",
  },
  image: {
    width: "100%",
    height: 150,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2F3C7E",
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#228B22",
    marginBottom: 6,
  },
  emptyText: {
    fontStyle: "italic",
    color: "#888",
    paddingVertical: 4,
  },
  dateText: {
    marginTop: 8,
    fontSize: 13,
    color: "#555",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});

export default HomeScreen;
