from searchLibraryComponents import get_library_by_cardtext
from searchLibraryComponents import get_library_by_cardname
from searchLibraryComponents import get_library_by_trait
from searchLibraryComponents import get_library_by_discipline
from searchLibraryComponents import get_library_by_title
from searchLibraryComponents import get_library_by_sect
from searchLibraryComponents import get_library_by_clan
from searchLibraryComponents import get_library_by_cardtype
from searchLibraryComponents import get_library_by_blood
from searchLibraryComponents import get_library_by_pool
from searchLibraryComponents import get_library_by_set
from searchLibraryComponents import get_library_by_precon
from searchLibraryComponents import get_library_by_artist
from searchLibraryComponents import get_overall_library


def searchLibrary(request):
    match_by_category = []
    good_library_cards = []
    parameters = 0

    try:
        if request.json['name']:
            parameters += 1
            cards_by_cardname = get_library_by_cardname(request.json['name'])
            match_by_category.append(cards_by_cardname)
    except KeyError:
        pass

    try:
        if request.json['text']:
            parameters += 1
            cards_by_cardtext = get_library_by_cardtext(request.json['text'])
            match_by_category.append(cards_by_cardtext)
    except KeyError:
        pass

    try:
        if request.json['traits']:
            parameters += 1
            cards_by_trait = get_library_by_trait(request.json['traits'])
            match_by_category.append(cards_by_trait)
    except KeyError:
        pass

    try:
        if request.json['type']:
            parameters += 1
            cards_by_cardtype = get_library_by_cardtype(request.json['type'])
            match_by_category.append(cards_by_cardtype)
    except KeyError:
        pass

    try:
        if request.json['discipline']:
            parameters += 1
            cards_by_discipline = get_library_by_discipline(
                request.json['discipline'])
            match_by_category.append(cards_by_discipline)
    except KeyError:
        pass

    try:
        if request.json['title']:
            parameters += 1
            cards_by_title = get_library_by_title(request.json['title'])
            match_by_category.append(cards_by_title)
    except KeyError:
        pass

    try:
        if request.json['sect']:
            parameters += 1
            cards_by_sect = get_library_by_sect(request.json['sect'])
            match_by_category.append(cards_by_sect)
    except KeyError:
        pass

    try:
        if request.json['clan']:
            parameters += 1
            cards_by_clan = get_library_by_clan(request.json['clan'])
            match_by_category.append(cards_by_clan)
    except KeyError:
        pass

    try:
        if request.json['blood']:
            blood = request.json['blood']
            bloodmoreless = request.json['bloodmoreless']
            parameters += 1
            cards_by_blood = get_library_by_blood(blood, bloodmoreless)
            match_by_category.append(cards_by_blood)
    except KeyError:
        pass

    try:
        if request.json['pool']:
            parameters += 1
            pool = request.json['pool']
            poolmoreless = request.json['poolmoreless']
            cards_by_pool = get_library_by_pool(pool, poolmoreless)
            match_by_category.append(cards_by_pool)
    except KeyError:
        pass

    try:
        if request.json['set']:
            parameters += 1
            cards_by_set = get_library_by_set(request.json['set'])
            match_by_category.append(cards_by_set)
    except KeyError:
        pass

    try:
        if request.json['precon']:
            parameters += 1
            cards_by_precon = get_library_by_precon(request.json['precon'])
            match_by_category.append(cards_by_precon)
    except KeyError:
        pass

    try:
        if request.json['artist']:
            parameters += 1
            cards_by_artist = get_library_by_artist(request.json['artist'])
            match_by_category.append(cards_by_artist)
    except KeyError:
        pass

    if parameters == 0:
        return 400
    else:
        good_library_cards = get_overall_library(match_by_category)
        if good_library_cards:
            return good_library_cards
        else:
            return 400
