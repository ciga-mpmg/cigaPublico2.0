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
      output_dir = here::here("src/pages/mapas/")
   )
}

# Cria as páginas de TACs ---------------------------------------------

criar_html_tac <- function(nome) {
   nome |>
      stringi::stri_trans_general("Latin-ASCII") |>
      tolower() |>
      stringr::str_remove_all("[:punct:]") |>
      stringr::str_replace_all(" ", "_") |>
      paste0(".html")
}

# Conecta ao banco de dados
con <- DBI::dbConnect(
   RSQLite::SQLite(),
   "../painelInfoTacs/bd_ciga.sqlite"
)

tab_tacs <- dplyr::tbl(con, "tacs") |>
   dplyr::collect()

# Remove arquivos atuais
html_existentes <- list.files(
   path = here::here("src/pages/tacs"),
   pattern = "*.html",
   full.names = TRUE
)
fs::file_delete(html_existentes)

# Cria todos os HTMLs

for (i in 1:nrow(tab_tacs)) {
   # Pega valores do TAC
   tab <- tab_tacs[i, ]
   nome_tac <- tab$name_aecom
   img_suffix_tac <- tab$image_suffix
   fonte_img_tac <- tab$image_source
   descricao_tac <- tab$abstract
   situacao_tac <- tab$situation
   data_assinatura_tac <- tab$signature_date
   compromissaria_tac <- tab$committed_party
   auditoria_tac <- tab$audit

   # Cria nome do arquivo HTML
   nome_html <- criar_html_tac(tab$name_aecom)

   # Lê o template da página HTML
   template <- readLines(here::here("R/tacs/template.html"), warn = FALSE)

   # Substitui valores no template
   envir <- environment()
   html <- purrr::map_chr(
      template,
      ~ glue::glue(.x, .envir = envir, .open = "{{", .close = "}}")
   )

   # Cria novos arquivos
   writeLines(html, here::here(paste0("src/pages/tacs/", nome_html)))
}

# Arruma as opções na página Ciga -------------------------------------

# Cria o HTML com as opções do selectInput
html <- tab_tacs |>
   dplyr::filter(!stringr::str_detect(name, "ADITIVO")) |>
   dplyr::select(group, name_aecom) |>
   dplyr::arrange(group, name_aecom) |>
   dplyr::group_by(group) |>
   dplyr::summarise(
      tacs = list(name_aecom)
   ) |>
   dplyr::mutate(
      html = purrr::map2_chr(
         group,
         tacs,
         ~ as.character(
            htmltools::tagList(
               htmltools::tags$optgroup(label = .x),
               purrr::map(
                  .y,
                  ~ htmltools::tags$option(
                     value = paste0("./tacs/", criar_html_tac(.x)),
                     .x
                  )
               )
            )
         )
      )
   ) |>
   dplyr::pull(html) |>
   paste(collapse = "\n")

# Coloca a opção "Selecione um TAC" no início
html <- paste(
   '<option value="" hidden="">Selecione um TAC</option>',
   html,
   sep = "\n"
)

# Lê o HTML da página Ciga
ciga_html <- readLines(here::here("src/pages/ciga.html"), warn = FALSE)

# Encontra a parte do código onde estão as opções do select
indice_inicio <- which(stringr::str_detect(ciga_html, "_inicio_opcoes_tacs_"))
indice_fim <- which(stringr::str_detect(ciga_html, "_fim_opcoes_tacs_"))

# Monta o novo HTML
novo_ciga_html <- c(
   ciga_html[1:indice_inicio],
   html,
   ciga_html[indice_fim:length(ciga_html)]
)

# Escreve o novo HTML
writeLines(novo_ciga_html, here::here("src/pages/ciga.html"))
