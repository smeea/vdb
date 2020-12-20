from searchTwdComponents import get_twd_by_location
from searchTwdComponents import get_twd_by_player
from searchTwdComponents import get_twd_by_crypt
from searchTwdComponents import get_twd_by_library
# from searchCryptComponents import get_crypt_by_cardname
# from searchCryptComponents import get_crypt_by_trait
# from searchCryptComponents import get_crypt_by_disciplines
# from searchCryptComponents import get_crypt_by_title
# from searchCryptComponents import get_crypt_by_votes
# from searchCryptComponents import get_crypt_by_capacity
# from searchCryptComponents import get_crypt_by_group
# from searchCryptComponents import get_crypt_by_sect
# from searchCryptComponents import get_crypt_by_clan
# from searchCryptComponents import get_crypt_by_set
# from searchCryptComponents import get_crypt_by_precon
# from searchCryptComponents import get_crypt_by_artist
from searchTwdComponents import get_overall_twd


def searchTwd(request):
    match_by_category = []
    good_twd = []
    parameters = 0

    try:
        if request.json['player']:
            parameters += 1
            twd_by_player = get_twd_by_player(request.json['player'])
            match_by_category.append(twd_by_player)
    except KeyError:
        pass

    try:
        if request.json['location']:
            parameters += 1
            twd_by_location = get_twd_by_location(request.json['location'])
            match_by_category.append(twd_by_location)
    except KeyError:
        pass

    try:
        if request.json['crypt']:
            parameters += 1
            twd_by_crypt = get_twd_by_crypt(request.json['crypt'])
            match_by_category.append(twd_by_crypt)
    except KeyError:
        pass

    try:
        if request.json['library']:
            parameters += 1
            twd_by_library = get_twd_by_library(request.json['library'])
            match_by_category.append(twd_by_library)
    except KeyError:
        pass

    # try:
    #     if request.json['text']:
    #         parameters += 1
    #         cards_by_cardtext = get_crypt_by_cardtext(request.json['text'])
    #         match_by_category.append(cards_by_cardtext)
    # except KeyError:
    #     pass

    # try:
    #     if request.json['sect']:
    #         parameters += 1
    #         cards_by_sect = get_crypt_by_sect(request.json['sect'])
    #         match_by_category.append(cards_by_sect)
    # except KeyError:
    #     pass

    # try:
    #     if request.json['clan']:
    #         parameters += 1
    #         cards_by_clan = get_crypt_by_clan(request.json['clan'])
    #         match_by_category.append(cards_by_clan)
    # except KeyError:
    #     pass

    # try:
    #     if request.json['traits']:
    #         parameters += 1
    #         cards_by_trait = get_crypt_by_trait(request.json['traits'])
    #         match_by_category.append(cards_by_trait)
    # except KeyError:
    #     pass

    # try:
    #     if request.json['disciplines'] or request.json['virtues']:
    #         parameters += 1
    #         cards_by_disciplines = get_crypt_by_disciplines(
    #             request.json['disciplines'])
    #         match_by_category.append(cards_by_disciplines)
    # except KeyError:
    #     pass

    # try:
    #     if request.json['virtues']:
    #         parameters += 1
    #         cards_by_virtues = get_crypt_by_disciplines(
    #             request.json['virtues'])
    #         match_by_category.append(cards_by_virtues)
    # except KeyError:
    #     pass

    # try:
    #     if request.json['titles']:
    #         parameters += 1
    #         cards_by_titles = get_crypt_by_title(request.json['titles'])
    #         match_by_category.append(cards_by_titles)
    # except KeyError:
    #     pass

    # try:
    #     if request.json['votes']:
    #         parameters += 1
    #         cards_by_votes = get_crypt_by_votes(int(request.json['votes']))
    #         match_by_category.append(cards_by_votes)
    # except KeyError:
    #     pass

    # try:
    #     if request.json['capacity']:
    #         capacity = int(request.json['capacity'])
    #         capacitymoreless = request.json['capacitymoreless']
    #         parameters += 1
    #         cards_by_capacity = get_crypt_by_capacity(capacity,
    #                                                   capacitymoreless)
    #         match_by_category.append(cards_by_capacity)
    # except KeyError:
    #     pass

    # try:
    #     if request.json['group']:
    #         parameters += 1
    #         cards_by_group = get_crypt_by_group(request.json['group'])
    #         match_by_category.append(cards_by_group)
    # except KeyError:
    #     pass

    # try:
    #     if request.json['set']:
    #         parameters += 1
    #         try:
    #             if request.json['setOptions']:
    #                 cards_by_set = get_crypt_by_set(request.json['set'], request.json['setOptions'])
    #                 match_by_category.append(cards_by_set)
    #         except KeyError:
    #             cards_by_set = get_crypt_by_set(request.json['set'])
    #             match_by_category.append(cards_by_set)
    # except KeyError:
    #     pass

    # try:
    #     if request.json['precon']:
    #         parameters += 1
    #         try:
    #             if request.json['preconOptions']:
    #                 cards_by_precon = get_crypt_by_precon(request.json['precon'], request.json['preconOptions'])
    #                 match_by_category.append(cards_by_precon)
    #         except KeyError:
    #             cards_by_precon = get_crypt_by_precon(request.json['precon'])
    #             match_by_category.append(cards_by_precon)
    # except KeyError:
    #     pass

    # try:
    #     if request.json['artist']:
    #         parameters += 1
    #         cards_by_artist = get_crypt_by_artist(request.json['artist'])
    #         match_by_category.append(cards_by_artist)
    # except KeyError:
    #     pass

    if parameters == 0:
        return 400
    else:
        good_twd = get_overall_twd(match_by_category)
        if good_twd:
            return good_twd
        else:
            return 400
