/* ═══════════════════════════════════════════
   StockFlow — C HTTP Server
   Original inventory logic + HTTP JSON API
   ═══════════════════════════════════════════ */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <winsock2.h>

#pragma comment(lib, "ws2_32.lib")

/* ── Original Constants ── */
#define MAX_NOM 100
#define MAX_CAT 60
#define MAX_TEL 20
#define MAX_ADR 150

/* ── Server Constants ── */
#define PORT 8080
#define MAX_REQ 16384
#define MAX_RESP 131072

/* ═══════════════════════════════════════════
   ORIGINAL DATA STRUCTURES (unchanged)
   ═══════════════════════════════════════════ */

typedef struct Produit {
    int id;
    char nom[MAX_NOM];
    char cat[MAX_CAT];
    double prix;
    int qte;
    int seuil;
    int id_fourn;
    struct Produit *suiv;
    struct Produit *prec;
} Produit;

typedef struct Fournisseur {
    int id;
    char nom[MAX_NOM];
    char tel[MAX_TEL];
    char adr[MAX_ADR];
    struct Fournisseur *suiv;
    struct Fournisseur *prec;
} Fournisseur;

typedef struct {
    Produit *tete;
    Produit *queue;
    int taille;
    int next_id;
} ListeP;

typedef struct {
    Fournisseur *tete;
    Fournisseur *queue;
    int taille;
    int next_id;
} ListeF;

typedef struct Personnel {
    int id;
    char nom[MAX_NOM];
    char role[MAX_CAT];
    char email[MAX_NOM];
    struct Personnel *suiv;
    struct Personnel *prec;
} Personnel;

typedef struct {
    Personnel *tete;
    Personnel *queue;
    int taille;
    int next_id;
} ListePers;



ListeP listProd = {NULL, NULL, 0, 1};
ListeF listFourn = {NULL, NULL, 0, 1};
ListePers listPers = {NULL, NULL, 0, 1};



/* ═══════════════════════════════════════════
   ORIGINAL CRUD FUNCTIONS (adapted for API)
   Same logic, parameters instead of stdin
   ═══════════════════════════════════════════ */

/* creer_fourn — now takes parameters */
Fournisseur* creer_fourn(const char *nom, const char *tel, const char *adr) {
    Fournisseur *f = (Fournisseur*)malloc(sizeof(Fournisseur));
    if (f == NULL) return NULL;
    f->id = listFourn.next_id;
    listFourn.next_id = listFourn.next_id + 1;
    strncpy(f->nom, nom, MAX_NOM - 1); f->nom[MAX_NOM - 1] = 0;
    strncpy(f->tel, tel, MAX_TEL - 1); f->tel[MAX_TEL - 1] = 0;
    strncpy(f->adr, adr, MAX_ADR - 1); f->adr[MAX_ADR - 1] = 0;
    f->suiv = NULL;
    f->prec = NULL;
    return f;
}

/* ajouter_fourn — unchanged */
void ajouter_fourn(Fournisseur *f) {
    if (listFourn.tete == NULL) {
        listFourn.tete = f;
        listFourn.queue = f;
    } else {
        f->prec = listFourn.queue;
        listFourn.queue->suiv = f;
        listFourn.queue = f;
    }
    listFourn.taille = listFourn.taille + 1;
}

/* supprimer_fourn — takes id parameter, returns 1=ok 0=not found */
int supprimer_fourn(int id) {
    Fournisseur *c = listFourn.tete;
    while (c != NULL) {
        if (c->id == id) {
            if (c->prec == NULL) {
                listFourn.tete = c->suiv;
            } else {
                c->prec->suiv = c->suiv;
            }
            if (c->suiv == NULL) {
                listFourn.queue = c->prec;
            } else {
                c->suiv->prec = c->prec;
            }
            free(c);
            listFourn.taille = listFourn.taille - 1;
            return 1;
        }
        c = c->suiv;
    }
    return 0;
}

/* creer_prod — now takes parameters */
Produit* creer_prod(const char *nom, const char *cat, double prix, int qte, int seuil, int id_fourn) {
    Produit *p = (Produit*)malloc(sizeof(Produit));
    if (p == NULL) return NULL;
    p->id = listProd.next_id;
    listProd.next_id = listProd.next_id + 1;
    strncpy(p->nom, nom, MAX_NOM - 1); p->nom[MAX_NOM - 1] = 0;
    strncpy(p->cat, cat, MAX_CAT - 1); p->cat[MAX_CAT - 1] = 0;
    p->prix = prix;
    p->qte = qte;
    p->seuil = seuil;
    p->id_fourn = id_fourn;
    p->suiv = NULL;
    p->prec = NULL;
    return p;
}

/* ajouter_prod — unchanged */
void ajouter_prod(Produit *p) {
    if (listProd.tete == NULL) {
        listProd.tete = p;
        listProd.queue = p;
    } else {
        p->prec = listProd.queue;
        listProd.queue->suiv = p;
        listProd.queue = p;
    }
    listProd.taille = listProd.taille + 1;
}

/* modifier_prod — takes all parameters */
int modifier_prod(int id, const char *nom, const char *cat, double prix, int qte, int seuil, int id_fourn) {
    Produit *c = listProd.tete;
    while (c != NULL) {
        if (c->id == id) {
            strncpy(c->nom, nom, MAX_NOM - 1); c->nom[MAX_NOM - 1] = 0;
            strncpy(c->cat, cat, MAX_CAT - 1); c->cat[MAX_CAT - 1] = 0;
            c->prix = prix;
            c->qte = qte;
            c->seuil = seuil;
            c->id_fourn = id_fourn;
            return 1;
        }
        c = c->suiv;
    }
    return 0;
}

/* supprimer_prod — takes id parameter, returns 1=ok 0=not found */
int supprimer_prod(int id) {
    Produit *c = listProd.tete;
    while (c != NULL) {
        if (c->id == id) {
            if (c->prec == NULL) {
                listProd.tete = c->suiv;
            } else {
                c->prec->suiv = c->suiv;
            }
            if (c->suiv == NULL) {
                listProd.queue = c->prec;
            } else {
                c->suiv->prec = c->prec;
            }
            free(c);
            listProd.taille = listProd.taille - 1;
            return 1;
        }
        c = c->suiv;
    }
    return 0;
}

/* ── Personnel CRUD ── */
Personnel* creer_personnel(const char *nom, const char *role, const char *email) {
    Personnel *p = (Personnel*)malloc(sizeof(Personnel));
    if (!p) return NULL;
    p->id = listPers.next_id++;
    strncpy(p->nom, nom, MAX_NOM-1); p->nom[MAX_NOM-1] = 0;
    strncpy(p->role, role, MAX_CAT-1); p->role[MAX_CAT-1] = 0;
    strncpy(p->email, email, MAX_NOM-1); p->email[MAX_NOM-1] = 0;
    p->suiv = p->prec = NULL;
    return p;
}

void ajouter_personnel(Personnel *p) {
    if (!listPers.tete) { listPers.tete = listPers.queue = p; }
    else { p->prec = listPers.queue; listPers.queue->suiv = p; listPers.queue = p; }
    listPers.taille++;
}

int supprimer_personnel(int id) {
    Personnel *c = listPers.tete;
    while (c) {
        if (c->id == id) {
            if (c->prec) c->prec->suiv = c->suiv; else listPers.tete = c->suiv;
            if (c->suiv) c->suiv->prec = c->prec; else listPers.queue = c->prec;
            free(c); listPers.taille--;
            return 1;
        }
        c = c->suiv;
    }
    return 0;
}

/* ═══════════════════════════════════════════
   JSON HELPERS
   ═══════════════════════════════════════════ */

void json_escape(const char *src, char *dst, int max) {
    int i = 0;
    while (*src && i < max - 2) {
        if (*src == '"' || *src == '\\') { dst[i++] = '\\'; }
        else if (*src == '\n') { dst[i++] = '\\'; dst[i++] = 'n'; src++; continue; }
        else if (*src == '\r') { src++; continue; }
        dst[i++] = *src++;
    }
    dst[i] = 0;
}

int json_str(const char *json, const char *key, char *out, int max) {
    char pat[256];
    snprintf(pat, sizeof(pat), "\"%s\"", key);
    const char *p = strstr(json, pat);
    if (!p) return 0;
    p += strlen(pat);
    while (*p == ' ' || *p == ':' || *p == '\t') p++;
    if (*p != '"') return 0;
    p++;
    int i = 0;
    while (*p && *p != '"' && i < max - 1) {
        if (*p == '\\' && *(p + 1)) { p++; }
        out[i++] = *p++;
    }
    out[i] = 0;
    return 1;
}

int json_int(const char *json, const char *key, int *out) {
    char pat[256];
    snprintf(pat, sizeof(pat), "\"%s\"", key);
    const char *p = strstr(json, pat);
    if (!p) return 0;
    p += strlen(pat);
    while (*p == ' ' || *p == ':' || *p == '\t') p++;
    *out = atoi(p);
    return 1;
}

int json_dbl(const char *json, const char *key, double *out) {
    char pat[256];
    snprintf(pat, sizeof(pat), "\"%s\"", key);
    const char *p = strstr(json, pat);
    if (!p) return 0;
    p += strlen(pat);
    while (*p == ' ' || *p == ':' || *p == '\t') p++;
    *out = atof(p);
    return 1;
}

/* ═══════════════════════════════════════════
   URL / QUERY HELPERS
   ═══════════════════════════════════════════ */

int query_int(const char *qs, const char *key, int *out) {
    char pat[256];
    snprintf(pat, sizeof(pat), "%s=", key);
    const char *p = strstr(qs, pat);
    if (!p) return 0;
    *out = atoi(p + strlen(pat));
    return 1;
}

void query_str(const char *qs, const char *key, char *out, int max) {
    char pat[256];
    snprintf(pat, sizeof(pat), "%s=", key);
    const char *p = strstr(qs, pat);
    out[0] = 0;
    if (!p) return;
    p += strlen(pat);
    int i = 0;
    while (*p && *p != '&' && i < max - 1) {
        if (*p == '%' && p[1] && p[2]) {
            char h[3] = {p[1], p[2], 0};
            out[i++] = (char)strtol(h, NULL, 16);
            p += 3;
        } else if (*p == '+') {
            out[i++] = ' '; p++;
        } else {
            out[i++] = *p++;
        }
    }
    out[i] = 0;
}

/* ═══════════════════════════════════════════
   API HANDLERS — build JSON response body
   ═══════════════════════════════════════════ */

void api_get_products(char *out) {
    char *w = out;
    w += sprintf(w, "[");
    Produit *c = listProd.tete;
    int first = 1;
    while (c != NULL) {
        char ne[MAX_NOM * 2], ce[MAX_CAT * 2];
        json_escape(c->nom, ne, sizeof(ne));
        json_escape(c->cat, ce, sizeof(ce));
        if (!first) w += sprintf(w, ",");
        w += sprintf(w,
            "{\"id\":%d,\"nom\":\"%s\",\"cat\":\"%s\",\"prix\":%.2f,\"qte\":%d,\"seuil\":%d,\"id_fourn\":%d}",
            c->id, ne, ce, c->prix, c->qte, c->seuil, c->id_fourn);
        first = 0;
        c = c->suiv;
    }
    sprintf(w, "]");
}

void api_post_product(const char *body, char *out) {
    char nom[MAX_NOM] = {0}, cat[MAX_CAT] = {0};
    double prix = 0; int qte = 0, seuil = 0, id_fourn = 0;

    json_str(body, "nom", nom, MAX_NOM);
    json_str(body, "cat", cat, MAX_CAT);
    json_dbl(body, "prix", &prix);
    json_int(body, "qte", &qte);
    json_int(body, "seuil", &seuil);
    json_int(body, "id_fourn", &id_fourn);

    if (strlen(nom) == 0 || strlen(cat) == 0) {
        sprintf(out, "{\"success\":false,\"message\":\"Champs requis manquants\"}");
        return;
    }

    Produit *p = creer_prod(nom, cat, prix, qte, seuil, id_fourn);
    if (p == NULL) {
        sprintf(out, "{\"success\":false,\"message\":\"Erreur memoire\"}");
        return;
    }
    ajouter_prod(p);
    sprintf(out, "{\"success\":true,\"id\":%d,\"message\":\"Produit ajoute\"}", p->id);
}

void api_put_product(const char *body, char *out) {
    int id = 0;
    char nom[MAX_NOM] = {0}, cat[MAX_CAT] = {0};
    double prix = 0; int qte = 0, seuil = 0, id_fourn = 0;

    json_int(body, "id", &id);
    json_str(body, "nom", nom, MAX_NOM);
    json_str(body, "cat", cat, MAX_CAT);
    json_dbl(body, "prix", &prix);
    json_int(body, "qte", &qte);
    json_int(body, "seuil", &seuil);
    json_int(body, "id_fourn", &id_fourn);

    if (modifier_prod(id, nom, cat, prix, qte, seuil, id_fourn)) {
        sprintf(out, "{\"success\":true,\"message\":\"Produit modifie\"}");
    } else {
        sprintf(out, "{\"success\":false,\"message\":\"Produit introuvable\"}");
    }
}

void api_delete_product(int id, char *out) {
    if (supprimer_prod(id)) {
        sprintf(out, "{\"success\":true,\"message\":\"Produit supprime\"}");
    } else {
        sprintf(out, "{\"success\":false,\"message\":\"Produit introuvable\"}");
    }
}

void api_search_products(const char *q, char *out) {
    char *w = out;
    w += sprintf(w, "[");
    Produit *c = listProd.tete;
    int first = 1;
    while (c != NULL) {
        if (strstr(c->nom, q) != NULL || strstr(c->cat, q) != NULL) {
            char ne[MAX_NOM * 2], ce[MAX_CAT * 2];
            json_escape(c->nom, ne, sizeof(ne));
            json_escape(c->cat, ce, sizeof(ce));
            if (!first) w += sprintf(w, ",");
            w += sprintf(w,
                "{\"id\":%d,\"nom\":\"%s\",\"cat\":\"%s\",\"prix\":%.2f,\"qte\":%d,\"seuil\":%d,\"id_fourn\":%d}",
                c->id, ne, ce, c->prix, c->qte, c->seuil, c->id_fourn);
            first = 0;
        }
        c = c->suiv;
    }
    sprintf(w, "]");
}

void api_get_alerts(char *out) {
    char *w = out;
    w += sprintf(w, "[");
    Produit *c = listProd.tete;
    int first = 1;
    while (c != NULL) {
        if (c->qte <= c->seuil) {
            char ne[MAX_NOM * 2], ce[MAX_CAT * 2];
            json_escape(c->nom, ne, sizeof(ne));
            json_escape(c->cat, ce, sizeof(ce));
            if (!first) w += sprintf(w, ",");
            w += sprintf(w,
                "{\"id\":%d,\"nom\":\"%s\",\"cat\":\"%s\",\"prix\":%.2f,\"qte\":%d,\"seuil\":%d,\"id_fourn\":%d}",
                c->id, ne, ce, c->prix, c->qte, c->seuil, c->id_fourn);
            first = 0;
        }
        c = c->suiv;
    }
    sprintf(w, "]");
}

void api_get_suppliers(char *out) {
    char *w = out;
    w += sprintf(w, "[");
    Fournisseur *c = listFourn.tete;
    int first = 1;
    while (c != NULL) {
        char ne[MAX_NOM * 2], te[MAX_TEL * 2], ae[MAX_ADR * 2];
        json_escape(c->nom, ne, sizeof(ne));
        json_escape(c->tel, te, sizeof(te));
        json_escape(c->adr, ae, sizeof(ae));
        if (!first) w += sprintf(w, ",");
        w += sprintf(w,
            "{\"id\":%d,\"nom\":\"%s\",\"tel\":\"%s\",\"adr\":\"%s\"}",
            c->id, ne, te, ae);
        first = 0;
        c = c->suiv;
    }
    sprintf(w, "]");
}

void api_post_supplier(const char *body, char *out) {
    char nom[MAX_NOM] = {0}, tel[MAX_TEL] = {0}, adr[MAX_ADR] = {0};

    json_str(body, "nom", nom, MAX_NOM);
    json_str(body, "tel", tel, MAX_TEL);
    json_str(body, "adr", adr, MAX_ADR);

    if (strlen(nom) == 0 || strlen(tel) == 0 || strlen(adr) == 0) {
        sprintf(out, "{\"success\":false,\"message\":\"Champs requis manquants\"}");
        return;
    }

    Fournisseur *f = creer_fourn(nom, tel, adr);
    if (f == NULL) {
        sprintf(out, "{\"success\":false,\"message\":\"Erreur memoire\"}");
        return;
    }
    ajouter_fourn(f);
    sprintf(out, "{\"success\":true,\"id\":%d,\"message\":\"Fournisseur ajoute\"}", f->id);
}

void api_delete_supplier(int id, char *out) {
    if (supprimer_fourn(id)) {
        sprintf(out, "{\"success\":true,\"message\":\"Fournisseur supprime\"}");
    } else {
        sprintf(out, "{\"success\":false,\"message\":\"Fournisseur introuvable\"}");
    }
}



void api_get_stats(char *out) {
    double val = 0;
    int alerts = 0;
    Produit *c = listProd.tete;
    while (c != NULL) {
        val += c->prix * c->qte;
        if (c->qte <= c->seuil) alerts++;
        c = c->suiv;
    }
    sprintf(out,
        "{\"totalProducts\":%d,\"totalSuppliers\":%d,\"totalAlerts\":%d,\"totalValue\":%.2f}",
        listProd.taille, listFourn.taille, alerts, val);
}

/* ── Personnel API ── */
void api_get_personnel(char *out) {
    char *w = out;
    w += sprintf(w, "[");
    Personnel *c = listPers.tete;
    int first = 1;
    while (c) {
        char ne[MAX_NOM*2], re[MAX_CAT*2], ee[MAX_NOM*2];
        json_escape(c->nom, ne, sizeof(ne));
        json_escape(c->role, re, sizeof(re));
        json_escape(c->email, ee, sizeof(ee));
        if (!first) w += sprintf(w, ",");
        w += sprintf(w, "{\"id\":%d,\"nom\":\"%s\",\"role\":\"%s\",\"email\":\"%s\"}", c->id, ne, re, ee);
        first = 0;
        c = c->suiv;
    }
    sprintf(w, "]");
}

void api_post_personnel(const char *body, char *out) {
    char nom[MAX_NOM]={0}, role[MAX_CAT]={0}, email[MAX_NOM]={0};
    json_str(body, "nom", nom, MAX_NOM);
    json_str(body, "role", role, MAX_CAT);
    json_str(body, "email", email, MAX_NOM);
    if (!strlen(nom) || !strlen(role)) {
        sprintf(out, "{\"success\":false,\"message\":\"Donnees invalides\"}");
        return;
    }
    Personnel *p = creer_personnel(nom, role, email);
    if (!p) { sprintf(out, "{\"success\":false}"); return; }
    ajouter_personnel(p);
    sprintf(out, "{\"success\":true,\"id\":%d}", p->id);
}

void api_delete_personnel(int id, char *out) {
    if (supprimer_personnel(id)) sprintf(out, "{\"success\":true}");
    else sprintf(out, "{\"success\":false,\"message\":\"Non trouve\"}");
}

/* ═══════════════════════════════════════════
   HTTP SERVER
   ═══════════════════════════════════════════ */

void send_response(SOCKET client, int status, const char *ctype, const char *body, int body_len) {
    char hdr[1024];
    const char *st = status == 200 ? "OK" : status == 404 ? "Not Found" : "Bad Request";
    int hlen = sprintf(hdr,
        "HTTP/1.1 %d %s\r\n"
        "Content-Type: %s\r\n"
        "Access-Control-Allow-Origin: *\r\n"
        "Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS\r\n"
        "Access-Control-Allow-Headers: Content-Type\r\n"
        "Connection: close\r\n"
        "Content-Length: %d\r\n"
        "\r\n", status, st, ctype, body_len);
    send(client, hdr, hlen, 0);
    if (body_len > 0) send(client, body, body_len, 0);
}

void send_json(SOCKET client, int status, const char *body) {
    send_response(client, status, "application/json; charset=utf-8", body, (int)strlen(body));
}

void serve_static(SOCKET client, const char *url_path) {
    const char *fname;
    if (strcmp(url_path, "/") == 0) fname = "index.html";
    else fname = url_path + 1;

    /* Security: block path traversal */
    if (strstr(fname, "..") != NULL) {
        send_json(client, 404, "{\"error\":\"Not found\"}");
        return;
    }

    FILE *f = fopen(fname, "rb");
    if (!f) {
        send_json(client, 404, "{\"error\":\"Not found\"}");
        return;
    }

    fseek(f, 0, SEEK_END);
    long sz = ftell(f);
    fseek(f, 0, SEEK_SET);

    char *buf = (char*)malloc(sz);
    if (!buf) { fclose(f); return; }
    fread(buf, 1, sz, f);
    fclose(f);

    /* Content-Type by extension */
    const char *ct = "application/octet-stream";
    if (strstr(fname, ".html")) ct = "text/html; charset=utf-8";
    else if (strstr(fname, ".css")) ct = "text/css; charset=utf-8";
    else if (strstr(fname, ".js")) ct = "application/javascript; charset=utf-8";
    else if (strstr(fname, ".json")) ct = "application/json; charset=utf-8";
    else if (strstr(fname, ".png")) ct = "image/png";
    else if (strstr(fname, ".jpg")) ct = "image/jpeg";
    else if (strstr(fname, ".ico")) ct = "image/x-icon";

    send_response(client, 200, ct, buf, (int)sz);
    free(buf);
}

void handle_client(SOCKET client) {
    char req[MAX_REQ] = {0};
    int total = 0, n;

    /* Read request */
    n = recv(client, req, MAX_REQ - 1, 0);
    if (n <= 0) return;
    total = n;

    /* If POST/PUT, ensure we read the full body */
    char *cl_hdr = strstr(req, "Content-Length:");
    if (cl_hdr) {
        int content_len = atoi(cl_hdr + 15);
        char *body_start = strstr(req, "\r\n\r\n");
        if (body_start) {
            body_start += 4;
            int body_read = total - (int)(body_start - req);
            while (body_read < content_len && total < MAX_REQ - 1) {
                n = recv(client, req + total, MAX_REQ - 1 - total, 0);
                if (n <= 0) break;
                total += n;
                body_read += n;
            }
        }
    }

    /* Parse first line */
    char method[16] = {0}, full_path[2048] = {0};
    sscanf(req, "%15s %2047s", method, full_path);

    /* Split path and query */
    char path[2048] = {0}, qs[2048] = {0};
    char *qm = strchr(full_path, '?');
    if (qm) {
        strncpy(path, full_path, qm - full_path);
        strcpy(qs, qm + 1);
    } else {
        strcpy(path, full_path);
    }

    /* Body */
    char *body = strstr(req, "\r\n\r\n");
    if (body) body += 4; else body = "";

    printf("  [%s] %s\n", method, path);

    /* CORS preflight */
    if (strcmp(method, "OPTIONS") == 0) {
        send_response(client, 200, "text/plain", "", 0);
        return;
    }

    /* ── API Routing ── */
    if (strncmp(path, "/api/", 5) == 0) {
        char resp[MAX_RESP] = {0};

        if (strcmp(method, "GET") == 0 && strcmp(path, "/api/products") == 0) {
            api_get_products(resp);
        }
        else if (strcmp(method, "POST") == 0 && strcmp(path, "/api/products") == 0) {
            api_post_product(body, resp);
        }
        else if (strcmp(method, "PUT") == 0 && strcmp(path, "/api/products") == 0) {
            api_put_product(body, resp);
        }
        else if (strcmp(method, "DELETE") == 0 && strcmp(path, "/api/products") == 0) {
            int id = 0; query_int(qs, "id", &id);
            api_delete_product(id, resp);
        }
        else if (strcmp(method, "GET") == 0 && strcmp(path, "/api/products/search") == 0) {
            char q[256] = {0}; query_str(qs, "q", q, sizeof(q));
            api_search_products(q, resp);
        }
        else if (strcmp(method, "GET") == 0 && strcmp(path, "/api/products/alerts") == 0) {
            api_get_alerts(resp);
        }
        else if (strcmp(method, "GET") == 0 && strcmp(path, "/api/suppliers") == 0) {
            api_get_suppliers(resp);
        }
        else if (strcmp(method, "POST") == 0 && strcmp(path, "/api/suppliers") == 0) {
            api_post_supplier(body, resp);
        }
        else if (strcmp(method, "DELETE") == 0 && strcmp(path, "/api/suppliers") == 0) {
            int id = 0; query_int(qs, "id", &id);
            api_delete_supplier(id, resp);
        }

        else if (strcmp(method, "GET") == 0 && strcmp(path, "/api/personnel") == 0) {
            api_get_personnel(resp);
        }
        else if (strcmp(method, "POST") == 0 && strcmp(path, "/api/personnel") == 0) {
            api_post_personnel(body, resp);
        }
        else if (strcmp(method, "DELETE") == 0 && strcmp(path, "/api/personnel") == 0) {
            int id = 0; query_int(qs, "id", &id);
            api_delete_personnel(id, resp);
        }
        else if (strcmp(method, "GET") == 0 && strcmp(path, "/api/stats") == 0) {
            api_get_stats(resp);
        }
        else {
            sprintf(resp, "{\"success\":false,\"message\":\"Route introuvable\"}");
        }

        send_json(client, 200, resp);
        return;
    }

    /* ── Static Files ── */
    serve_static(client, path);
}

int main() {
    WSADATA wsa;
    SOCKET server_fd, client_fd;
    struct sockaddr_in addr;
    int addr_len = sizeof(addr);

    printf("========================================\n");
    printf("  StockFlow — Serveur C HTTP\n");
    printf("  Gestion de Stock & Fournisseurs\n");
    printf("========================================\n\n");

    if (WSAStartup(MAKEWORD(2, 2), &wsa) != 0) {
        printf("Erreur WSAStartup: %d\n", WSAGetLastError());
        return 1;
    }

    server_fd = socket(AF_INET, SOCK_STREAM, 0);
    if (server_fd == INVALID_SOCKET) {
        printf("Erreur socket: %d\n", WSAGetLastError());
        WSACleanup();
        return 1;
    }

    /* Allow port reuse */
    int opt = 1;
    setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR, (char*)&opt, sizeof(opt));

    addr.sin_family = AF_INET;
    addr.sin_addr.s_addr = INADDR_ANY;
    addr.sin_port = htons(PORT);

    if (bind(server_fd, (struct sockaddr*)&addr, sizeof(addr)) == SOCKET_ERROR) {
        printf("Erreur bind (port %d deja utilise?): %d\n", PORT, WSAGetLastError());
        closesocket(server_fd);
        WSACleanup();
        return 1;
    }

    if (listen(server_fd, 10) == SOCKET_ERROR) {
        printf("Erreur listen: %d\n", WSAGetLastError());
        closesocket(server_fd);
        WSACleanup();
        return 1;
    }

    /* ── Pre-populate with sample data ── */
    Fournisseur *f1 = creer_fourn("TechDistrib SARL", "0550 11 22 33", "Alger, Zone Industrielle");
    Fournisseur *f2 = creer_fourn("Global Office", "041 55 66 77", "Oran, Centre-Ville");
    Fournisseur *f3 = creer_fourn("ElectroPro", "031 88 99 00", "Constantine, El Khroub");
    ajouter_fourn(f1);
    ajouter_fourn(f2);
    ajouter_fourn(f3);

    ajouter_prod(creer_prod("Clavier Mécanique RGB", "Informatique", 7500.00, 15, 5, f1->id));
    ajouter_prod(creer_prod("Souris Gamer", "Informatique", 4500.00, 3, 10, f1->id)); // ALERT
    ajouter_prod(creer_prod("Écran 27\" 4K", "Informatique", 45000.00, 8, 2, f1->id));
    ajouter_prod(creer_prod("Bureau Ergonomique", "Mobilier", 25000.00, 5, 5, f2->id)); // ALERT
    ajouter_prod(creer_prod("Chaise de Bureau", "Mobilier", 18000.00, 12, 3, f2->id));
    ajouter_prod(creer_prod("Câble HDMI 2.0", "Accessoires", 1200.00, 50, 10, f3->id));
    ajouter_prod(creer_prod("Disque Dur 1To", "Stockage", 9500.00, 2, 5, f3->id)); // ALERT

    ajouter_personnel(creer_personnel("Ahmed Mansouri", "Administrateur", "ahmed@stockflow.dz"));
    ajouter_personnel(creer_personnel("Lydia Belkacem", "Gestionnaire Stock", "lydia@stockflow.dz"));

    printf("Donnees de test generees (%d produits, %d fournisseurs, %d personnel).\n", listProd.taille, listFourn.taille, listPers.taille);

    printf("Serveur demarre sur http://localhost:%d\n", PORT);
    printf("Ouvrez cette adresse dans votre navigateur.\n");
    printf("Appuyez sur Ctrl+C pour arreter le serveur.\n\n");

    while (1) {
        client_fd = accept(server_fd, (struct sockaddr*)&addr, &addr_len);
        if (client_fd == INVALID_SOCKET) continue;
        handle_client(client_fd);
        closesocket(client_fd);
    }

    closesocket(server_fd);
    WSACleanup();
    return 0;
}
