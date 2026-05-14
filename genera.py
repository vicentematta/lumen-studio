#!/usr/bin/env python3
"""
Riverhaus · Generador de documentos
Uso: python genera.py
"""
import re
import subprocess
import sys
from datetime import date, timedelta
from pathlib import Path

BASE      = Path(__file__).parent
TEMPLATES = BASE / "docs/brand-kit-audit/assets/templates"
OUTPUT    = BASE / "docs/output"
LOGO_ABS  = str(BASE / "docs/brand-kit-audit/assets/logo-riverhaus-dark.svg")

MESES = ["enero","febrero","marzo","abril","mayo","junio",
         "julio","agosto","septiembre","octubre","noviembre","diciembre"]

def hoy():
    d = date.today()
    return f"{d.day} de {MESES[d.month-1]} de {d.year}"

def en_dias(n):
    d = date.today() + timedelta(days=n)
    return f"{d.day} de {MESES[d.month-1]} de {d.year}"

def ask(prompt, default=None):
    suffix = f"  [{default}]" if default else ""
    val = input(f"  {prompt}{suffix}: ").strip()
    return val if val else default

def clp(n):
    return f"{int(n):,}".replace(",", ".")

def abrir(path):
    print(f"\n  Archivo → {path.name}")
    print("  Abriendo Chrome: Cmd+P → Guardar como PDF → Márgenes: Ninguno → ✅ Gráficos de fondo\n")
    subprocess.Popen(["open", "-a", "Google Chrome", str(path)])


# ── COTIZACIÓN ────────────────────────────────────────────────────────────────

def pedir_items_cot():
    print("\n  Items del presupuesto (descripción,cantidad,precio_sin_puntos)")
    print("  Ejemplo: Diseño Web,1,1000000")
    print("  Enter vacío para terminar.\n")
    rows = []
    while True:
        linea = input("  → ").strip()
        if not linea:
            break
        p = [x.strip() for x in linea.split(",")]
        if len(p) == 3:
            try:
                rows.append((p[0], p[1], int(p[2])))
            except ValueError:
                print("    Precio debe ser número sin puntos.")
        else:
            print("    Formato: descripción,cantidad,precio")
    return rows

def tbody_cot(rows):
    total = sum(p for _, _, p in rows)
    trs = "\n".join(
        f'        <tr><td>{d}</td><td class="qty">{q}</td><td class="price">{clp(p)}</td></tr>'
        for d, q, p in rows
    )
    trs += f'\n        <tr class="total"><td colspan="2">Valor total (sin I.V.A.)</td><td class="price">CLP {clp(total)}</td></tr>'
    return trs, total

def generar_cotizacion():
    print("\n── DATOS DEL CLIENTE ───────────────────────")
    numero       = ask("Número (ej: 001)")
    fecha        = ask("Fecha de emisión", hoy())
    cliente      = ask("Nombre del cliente")
    razon_social = ask("Razón social", cliente)
    direccion    = ask("Dirección")
    email        = ask("Email cliente")
    rep          = ask("Representante / contacto")

    items = pedir_items_cot()

    html = (TEMPLATES / "cotizacion-template.html").read_text("utf-8")

    # Variables simples
    for k, v in {
        "{{NUMERO}}":       numero,
        "{{FECHA}}":        fecha,
        "{{CLIENTE}}":      cliente,
        "{{RAZON_SOCIAL}}": razon_social,
        "{{DIRECCION}}":    direccion,
        "{{EMAIL_CLIENTE}}": email,
        "{{REPRESENTANTE}}": rep,
    }.items():
        html = html.replace(k, v)

    # Logo con ruta absoluta
    html = html.replace("../logo-riverhaus-dark.svg", LOGO_ABS)

    # Reemplazar tbody de la tabla de precios si hay items
    if items:
        new_rows, _ = tbody_cot(items)
        html = re.sub(
            r'(<!-- ── REEMPLAZAR según servicio ── -->.*?)(</tbody>)',
            f'<!-- generado automáticamente -->\n{new_rows}\n      \\2',
            html,
            flags=re.DOTALL
        )

    nombre = f"COT-{numero}-{cliente.replace(' ', '-')}.html"
    out = OUTPUT / nombre
    OUTPUT.mkdir(parents=True, exist_ok=True)
    out.write_text(html, "utf-8")
    abrir(out)


# ── INVOICE ───────────────────────────────────────────────────────────────────

def pedir_items_inv():
    print("\n  Items (descripción,nota,cantidad,precio_unit)")
    print("  La nota puede quedar vacía: Diseño Web,,1,1000000")
    print("  Enter vacío para terminar.\n")
    rows = []
    idx = 1
    while True:
        linea = input(f"  {idx}. ").strip()
        if not linea:
            break
        p = [x.strip() for x in linea.split(",")]
        if len(p) == 4:
            try:
                rows.append((p[0], p[1], p[2], int(p[3])))
                idx += 1
            except ValueError:
                print("    Precio debe ser número sin puntos.")
        else:
            print("    Formato: descripción,nota,cantidad,precio_unit")
    return rows

def tbody_inv(rows):
    trs = []
    for i, (desc, nota, qty, precio) in enumerate(rows):
        sub = f'<div class="desc-sub">{nota}</div>' if nota else ""
        total_row = precio * int(qty)
        trs.append(f"""      <tr>
        <td class="num">{i+1}</td>
        <td>{desc}{sub}</td>
        <td class="qty">{qty}</td>
        <td class="unit">{clp(precio)}</td>
        <td class="amount">{clp(total_row)}</td>
      </tr>""")
    subtotal = sum(precio * int(qty) for _, _, qty, precio in rows)
    return "\n".join(trs), subtotal

def generar_invoice():
    print("\n── DATOS DEL INVOICE ───────────────────────")
    numero      = ask("Número invoice (ej: INV-001)")
    cot_ref     = ask("N° Cotización de referencia")
    fecha       = ask("Fecha de emisión", hoy())
    vencimiento = ask("Fecha de vencimiento (14 días)", en_dias(14))
    fecha_apro  = ask("Fecha aprobación cotización")
    cliente     = ask("Nombre cliente")
    razon_social= ask("Razón social", cliente)
    direccion   = ask("Dirección")
    rut         = ask("RUT cliente")
    email       = ask("Email cliente")

    items = pedir_items_inv()

    html = (TEMPLATES / "invoice-template.html").read_text("utf-8")

    # Variables simples
    for k, v in {
        "{{NUMERO}}":          numero,
        "{{COTIZACION_REF}}":  cot_ref,
        "{{FECHA}}":           fecha,
        "{{VENCIMIENTO}}":     vencimiento,
        "{{FECHA_APROBACION}}": fecha_apro,
        "{{CLIENTE}}":         cliente,
        "{{RAZON_SOCIAL}}":    razon_social,
        "{{DIRECCION}}":       direccion,
        "{{RUT_CLIENTE}}":     rut,
        "{{EMAIL_CLIENTE}}":   email,
    }.items():
        html = html.replace(k, v)

    # Logo
    html = html.replace("../logo-riverhaus-dark.svg", LOGO_ABS)

    # Reemplazar tbody e totales si hay items
    if items:
        new_rows, subtotal = tbody_inv(items)
        iva      = int(subtotal * 0.19)
        total    = subtotal + iva
        anticipo = total // 2
        pendiente= total - anticipo

        html = re.sub(
            r'(<!-- ── REEMPLAZAR según servicios entregados ── -->.*?)(</tbody>)',
            f'<!-- generado automáticamente -->\n{new_rows}\n    \\2',
            html,
            flags=re.DOTALL
        )

        # Totales hardcodeados en el template
        html = re.sub(r'>2\.400\.000<', f'>{clp(subtotal)}<', html)
        html = re.sub(r'>456\.000<',   f'>{clp(iva)}<',       html)
        html = re.sub(r'>2\.856\.000', f'>{clp(total)}',       html)
        html = html.replace("1.428.000 CLP", f"{clp(pendiente)} CLP")

        # Reemplazar {{SUBTOTAL}} {{IVA}} {{TOTAL}} si existen
        html = html.replace("{{SUBTOTAL}}", clp(subtotal))
        html = html.replace("{{IVA}}",      clp(iva))
        html = html.replace("{{TOTAL}}",    clp(total))

    nombre = f"INV-{numero}-{cliente.replace(' ', '-')}.html"
    out = OUTPUT / nombre
    OUTPUT.mkdir(parents=True, exist_ok=True)
    out.write_text(html, "utf-8")
    abrir(out)


# ── MAIN ──────────────────────────────────────────────────────────────────────

def main():
    print()
    print("  ╔═══════════════════════════════════╗")
    print("  ║  RIVERHAUS · Generador documentos ║")
    print("  ╚═══════════════════════════════════╝")
    print()
    print("  1  Cotización")
    print("  2  Invoice")
    print()
    tipo = input("  ¿Qué tipo? [1/2]: ").strip()

    if tipo == "1":
        generar_cotizacion()
    elif tipo == "2":
        generar_invoice()
    else:
        print("  Opción no válida.")
        sys.exit(1)

if __name__ == "__main__":
    main()
