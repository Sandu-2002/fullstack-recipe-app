import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { COLORS } from "../constants/colors";

const CategoryFilter = ({
  categories = [],
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category) => {
          const isSelected = selectedCategory === category.name;

          return (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryCard,
                isSelected && styles.selectedCategoryCard,
              ]}
              activeOpacity={0.8}
              onPress={() => onSelectCategory?.(category.name)}
            >
              <View
                style={[
                  styles.imageWrapper,
                  isSelected && styles.selectedImageWrapper,
                ]}
              >
                <Image
                  source={{ uri: category.image }}
                  style={styles.categoryImage}
                  contentFit="cover"
                  transition={300}
                  cachePolicy="memory-disk"
                />
              </View>

              <Text
                style={[
                  styles.categoryText,
                  isSelected && styles.selectedCategoryText,
                ]}
                numberOfLines={1}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default CategoryFilter;

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    marginBottom: 8,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  categoryCard: {
    width: 84,
    minHeight: 96,
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#eee",
  },
  selectedCategoryCard: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  imageWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: "hidden",
    backgroundColor: "#f3f3f3",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  selectedImageWrapper: {
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  categoryImage: {
    width: "100%",
    height: "100%",
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#444",
    textAlign: "center",
  },
  selectedCategoryText: {
    color: "#fff",
  },
});