import yaml
import re
import json


def parse_rule(rule):
    ref_regex = r"\[((?:TOM|SFC|JON|LSJ|PIB|ANK|RTR|RBK).*?)\]"
    text = re.sub(ref_regex, "", rule).strip()

    ref_ids = re.findall(ref_regex, rule)
    refs = {}
    for rid in ref_ids:
        refs[rid] = references_data[rid]

    return {
        "text": text,
        "refs": refs,
    }


with (
    open("rulings/groups.yaml", "r") as groups_file,
    open("rulings/references.yaml", "r") as references_file,
    open("rulings/rulings.yaml", "r") as rulings_file,
    open("rulings.json", "w", encoding="utf8") as rulings_output,
):
    groups_data = yaml.safe_load(groups_file)
    references_data = yaml.safe_load(references_file)
    rulings_data = yaml.safe_load(rulings_file)

    all_rulings = {}

    # DIRECT CARD RULINGS
    for k, r in rulings_data.items():
        if k.startswith("G"):
            continue

        [cardid, _] = k.split("|")
        card_rulings = []

        for rule in r:
            card_rulings.append(parse_rule(rule))

        all_rulings[cardid] = card_rulings

    # GROUP RULINGS
    for k, cards in groups_data.items():
        for r in rulings_data[k]:
            rule = parse_rule(r["text"]) if type(r) is dict else parse_rule(r)

            overrides = {}
            if type(r) is dict:
                for c, o in r["overrides"].items():
                    [cardid, _] = c.split("|")
                    overrides[cardid] = parse_rule(o)

            for card, target in cards.items():
                [cardid, _] = card.split("|")

                card_rule = overrides[cardid] if cardid in overrides else rule.copy()

                if target:
                    card_rule["text"] = f"{target} {card_rule['text']}"
                if cardid in all_rulings:
                    all_rulings[cardid].append(card_rule)
                else:
                    all_rulings[cardid] = [card_rule]

    json.dump(all_rulings, rulings_output, indent=4, separators=(",", ":"))
