# Mapas

rmd_mapas <- list.files(
   path = here::here("R/mapas"),
   pattern = "*.Rmd",
   full.names = TRUE
)

file_names <- tools::file_path_sans_ext(basename(rmd_mapas))

for (i in seq_along(rmd_mapas)) {
   rmarkdown::render(
      input = rmd_mapas[i],
      output_file = paste0(file_names[i], ".html"),
      output_dir = "src/pages/mapas/"
   )
}

# TACs
